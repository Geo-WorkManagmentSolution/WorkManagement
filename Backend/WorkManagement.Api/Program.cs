using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using WorkManagmentSolution.EFCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WorkManagement.Domain.Entity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WorkManagement.Service;
using WorkManagement.API.Extensions;
using WorkManagement.Domain.Contracts;
using WorkManagement.API.Middleware;
using Serilog;
using WorkManagement.Domain.Models.Email;
using System.Text.Json.Serialization;
using WorkManagement.Domain;
using Newtonsoft.Json.Converters;



Log.Logger = new LoggerConfiguration()
            .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day) // Specify the log file path and rolling interval
            .CreateLogger();

Log.Information("Starting web application");

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog();

    builder.Services
        .AddFluentEmail("fromemail@test.test")
        .AddRazorRenderer()
        .AddSmtpSender("localhost", 25);

    // Add services to the container.

    builder.Services.AddControllers();


    var configuration = builder.Configuration.SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                        .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
                        .Build();




    builder.Services.AddDbContext<WorkManagementDbContext>(options =>
        options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

    builder.Services.Configure<IdentityOptions>(opts =>
    {
        opts.Password.RequiredLength = 4; // Set the minimum required password length
        opts.Password.RequireLowercase = false; // Require at least one lowercase character
        opts.Password.RequireUppercase = false; // Require at least one uppercase character
        opts.Password.RequireDigit = false; // Require at least one numeric digit
        opts.Password.RequireNonAlphanumeric = false; // Require at least one non-alphanumeric character
        opts.Password.RequiredUniqueChars = 0; // Set the minimum number of unique characters
    });

    builder.Services.Configure<SMTPSettings>(configuration.GetSection("GmailSMTPSettings"));

    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
        .AddEntityFrameworkStores<WorkManagementDbContext>();

    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<IEmployeeService, EmployeeService>();
    builder.Services.AddScoped<IProjectService, ProjectServices>();
    builder.Services.AddScoped<IEmailService, EmailService>();
    builder.Services.AddScoped<ILeavesService, LeavesService>();
    builder.Services.AddCors();
    builder.Services.AddSwaggerGen(option =>
    {
        option.AddSecurityDefinition(name: JwtBearerDefaults.AuthenticationScheme, securityScheme: new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Description = "Enter the Bearer Authorization string as following: `Bearer Generated-JWT-Token`",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
        {
            new OpenApiSecurityScheme
            {
                Reference= new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id=JwtBearerDefaults.AuthenticationScheme
                }
            }, new string[]{}
        }
        });
    });



    builder.Services.AddTransient<EmployeeService>();
    builder.Services.AddTransient<AdvanceSearchService>();
    builder.Services.AddTransient<ProjectServices>();
    builder.Services.AddTransient<EmailService>();
    builder.Services.AddTransient<LeavesService>();

    builder.Services.AddAutoMapper(typeof(WorkManagement.Domain.AutoMapper.Profiles.EmployeeProfile).Assembly);

    builder.AddJWTAuthetication();
    builder.Services.AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        //options.SerializerSettings.Converters.Add(new JsonNullableStringEnumConverter());
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        //options.JsonSerializerOptions.Converters.Add(new EmptyStringToNullableEnumConverter());
    });
    var app = builder.Build();

   

    // Run pending migrations in DB
    using (var scope = app.Services.CreateScope()) // this will use `IServiceScopeFactory` internally
    {
        try
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            var roles = new[] { "admin", "Manager", "SuperUser", "HR Admin", "HR", "Employee" };

            foreach(var role in roles)
            {
                if(!await roleManager.RoleExistsAsync(role))
                {
                    var newRole = new ApplicationRole { Name = role };
                    await roleManager.CreateAsync(newRole);
                }
            }


            var db = scope.ServiceProvider.GetService<WorkManagementDbContext>();
            await db.Database.MigrateAsync();

        }
        catch (Exception e)
        {

        }
    }

    //should be changed in future

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Work Management API v1");
        });
    }


    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
        app.UseHttpsRedirection();

    app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

    app.UseAuthentication();
    app.UseAuthorization();

    // Other middleware configurations...
    app.MapControllers();

    app.UseMiddleware<ErrorHandlingMiddleware>();
    app.Run(async context =>
    {
        await context.Response.WriteAsync("Api is Up & running!");
    });
    app.Run();


}
catch (Exception ex)
{
    Log.Error(ex, "An error occurred in web starting");
}
finally
{
    Log.CloseAndFlush();
}

