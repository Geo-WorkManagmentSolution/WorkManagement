using AutoMapper;
using Azure;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagement.Service;
using WorkManagmentSolution.EFCore;
using WorkManagement.Domain.Contracts;
using Microsoft.AspNetCore.Authorization;
using WorkManagementSolution.Employee;
using Newtonsoft.Json;
using FluentEmail.Core;

namespace WorkManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : APIControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IAuthService _authService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly WorkManagementDbContext workManagementDbContext;
        private readonly IMapper mapper;
        private readonly IPermissionService permissionService;

        public AuthController(SignInManager<ApplicationUser> signInManager,
            IAuthService authService,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            WorkManagementDbContext workManagementDbContext,
            IPermissionService permissionService,
            IMapper mapper
            )
        {
            this.signInManager = signInManager;
            this._authService = authService;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.workManagementDbContext = workManagementDbContext;
            this.mapper = mapper;
            this.permissionService = permissionService;
        }
        public class UserloginModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Error
        {
            public string Type { get; set; }
            public string Message { get; set; }
        }
        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(UserloginModel userloginModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (IsValidUser(userloginModel.Email, userloginModel.Password).Result)
                    {
                        ApplicationUser? user = await workManagementDbContext.Users.FirstOrDefaultAsync(s => s.UserName == userloginModel.Email);
                        var role = await userManager.GetRolesAsync(user);


                        var claimList = new List<Claim>
                        {
                          new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email,userloginModel.Email),
                          new Claim(JwtRegisteredClaimNames.Name,userloginModel.Email),
                          new Claim(JwtRegisteredClaimNames.NameId,user.Id.ToString()),
                          new Claim(ClaimTypes.Role,role.FirstOrDefault())
                        };

                        var permissionsClaim = await permissionService.GetPermissionClaimsByUserAsync(user.Id);

                        // Serialize the hierarchical permissions into a JSON string
                        string permissionsJson = JsonConvert.SerializeObject(permissionsClaim);

                        //Adding permissions to the claims
                        claimList.Add(new Claim("Permissions", permissionsJson));

                        var token = _authService.GenerateJwtToken(claimList);
                        ClaimsIdentity claimsIdentity = new ClaimsIdentity(claimList, "auth");
                        ClaimsPrincipal claims = new ClaimsPrincipal(claimsIdentity);
                        await HttpContext.SignInAsync(claims);

                        var User = mapper.Map<UserModel>(user);
                        User.Role = role.FirstOrDefault();

                        LoggedInUserId = User.Uid;
                        return Ok(new { User = User, AccessToken = token });
                    }
                    else
                    {
                        return BadRequest(new List<Error> { new Error { Type = "email", Message = "Invalid Creds." } });
                    }
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
            else
                return BadRequest(ModelState);

        }


        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var Email = this.User.FindFirst(ClaimTypes.Email);
                var Role = this.User.FindFirst(ClaimTypes.Role);
                //var token = _authService.GenerateJwtToken(Email?.Value, Role?.Value);

                var dbuser = await workManagementDbContext.Users.FirstAsync(x => x.Email == Email.Value);
                var User = mapper.Map<UserModel>(dbuser);
                User.Role = Role?.Value;

                //if(User.Role != "admin")
                //{
                //    User.Role = "admin";
                //}

                return Ok(User);
            }
            catch (Exception ex)
            {
                return Problem("Contact Customer Care");
            }

        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                if (await UserExists(model.Email))
                    return BadRequest("The email address is already in use.");
                else
                {
                    try
                    {
                        var role = "admin";
                        var user = new ApplicationUser { UserName = model.Email, Email = model.Email, Shortcuts = new List<string>() };
                        var result = await userManager.CreateAsync(user, model.Password);

                        if (!await roleManager.RoleExistsAsync(role))
                        {
                            var newRole = new ApplicationRole { Name = role };
                            await roleManager.CreateAsync(newRole);
                        }

                        var roleResult = await userManager.AddToRoleAsync(user, role);

                        if (result.Succeeded && roleResult.Succeeded)
                        {
                            var userdata = await workManagementDbContext.Users.FirstOrDefaultAsync(s => s.Email == model.Email);
                            var User = mapper.Map<UserModel>(userdata);
                            User.Role = role;
                            var token = _authService.GenerateJwtToken(User.Data.Email, role, User.Uid);

                            return Ok(new { User = User, AccessToken = token });
                        }
                        else
                        {
                            return Problem("Error while creating user.");
                        }
                    }
                    catch (Exception ex)
                    {
                        // Log the exception for debugging purposes
                        Console.WriteLine(ex.ToString());
                        return Problem("Error while creating user.");
                    }
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        private async Task<bool> UserExists(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            // Check if the user exists in your database
            // You can query the database or use any other validation logic
            // For demonstration purposes, assume the user does not exist
            return user == null ? false : true;
        }


        [HttpPost("accesstoken")]
        public async Task<IActionResult> AccessToken(string accesstoken)
        {
            if (_authService.ValidateToken(accesstoken))
            {
                var userrole = _authService.DecodeJwtToken(accesstoken);
                var token = _authService.GenerateJwtToken(userrole.Item1, userrole.Item2, userrole.Item3);

                ApplicationUser? AppUser = await workManagementDbContext.Users.FindAsync(userrole.Item1);
                var User = mapper.Map<UserModel>(AppUser);
                User.Role = userrole.Item2;
                LoggedInUserId = User.Uid;
                return Ok(new { User = User, AccessToken = token });

            }
            else
                return Unauthorized("Invalid access token detected");
        }
        // Other methods: RefreshToken, Logout, etc.

        private async Task<bool> IsValidUser(string username, string password)
        {
            try
            {
                // Your user validation logic here
                // Return true if valid, otherwise false
                ApplicationUser? user = await workManagementDbContext.Users.FirstOrDefaultAsync(s => s.UserName == username);

                if (user != null)
                {
                    var PasswordHasher = new PasswordHasher<ApplicationUser>();
                    var verificationResult = PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
                    if (verificationResult == PasswordVerificationResult.Success)
                        return true;
                    else
                        return false;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        private async Task SignInUser(string? token)
        {
            var handler = new JwtSecurityTokenHandler();

            var jwt = handler.ReadJwtToken(token);

            var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
            identity.AddClaim(new Claim(JwtRegisteredClaimNames.Email,
                jwt.Claims.FirstOrDefault(u => u.Type == JwtRegisteredClaimNames.Email).Value));
            identity.AddClaim(new Claim(JwtRegisteredClaimNames.Name,
                jwt.Claims.FirstOrDefault(u => u.Type == JwtRegisteredClaimNames.Name).Value));


            identity.AddClaim(new Claim(ClaimTypes.Name,
                jwt.Claims.FirstOrDefault(u => u.Type == JwtRegisteredClaimNames.Email).Value));
            identity.AddClaim(new Claim(ClaimTypes.Role,
                jwt.Claims.FirstOrDefault(u => u.Type == "role").Value));



            var principal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        }



        [HttpGet("roles")]
        [Authorize]
        public async Task<List<RoleModel>> GetRoles()
        {
            return await roleManager.Roles.Select(x => new RoleModel { Id = x.Id, Name = x.Name }).ToListAsync();
        }
    }

}
