using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using WorkManagmentSolution.EFCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WorkManagement.Domain.Entity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WorkManagement.Service;
using WorkManagement.API.Extensions;
using WorkManagement.Domain.Contracts;


var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<WorkManagementDbContext>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
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
builder.Services.AddAutoMapper(typeof(WorkManagement.Domain.AutoMapper.Profiles.EmployeeProfile).Assembly);

builder.AddJWTAuthetication();
var app = builder.Build();


// Run pending migrations in DB
using (var scope = app.Services.CreateScope()) // this will use `IServiceScopeFactory` internally
{
    try
    {
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

app.MapControllers();


app.Run();
