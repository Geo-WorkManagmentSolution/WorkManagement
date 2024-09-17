using AutoMapper;
using Azure;
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

namespace WorkManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly AuthService authService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly WorkManagementDbContext workManagementDbContext;
        private readonly IMapper mapper;

        public AuthController(SignInManager<ApplicationUser> signInManager,
            AuthService authService,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            WorkManagementDbContext workManagementDbContext,
            IMapper mapper
            )
        {
            this.signInManager = signInManager;
            this.authService = authService;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.workManagementDbContext = workManagementDbContext;
            this.mapper = mapper;
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(string username, string password)
        {
            if (IsValidUser(username, password).Result)
            {
                ApplicationUser? user = await workManagementDbContext.Users.FindAsync(username);
                var role = await userManager.GetRolesAsync(user);
                var token = authService.GenerateJwtToken(username, role.FirstOrDefault());
                var User = mapper.Map<UserModel>(user);
                User.Role = role.FirstOrDefault();
                return Ok(new { User = User, AccessToken = token });
            }

            return Unauthorized("Invalid credentials");
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                if (await UserExists(model.Email))
                    return Conflict("User already exists.");
                else
                {
                    var role = "admin";
                    var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                    var result = await userManager.CreateAsync(user, model.Password);
                    var roleResult = await userManager.AddToRoleAsync(user, role);

                    if (result.Succeeded && roleResult.Succeeded)
                    {
                        ApplicationUser? AppUser = await workManagementDbContext.Users.FindAsync(result);
                        var User = mapper.Map<UserModel>(AppUser);
                        User.Role = role;
                        var token = authService.GenerateJwtToken(User.Email, role);

                        return Ok(new { User = User, AccessToken = token });
                    }
                    else
                        return Problem("Error while creating user.");
                }
            }
            else
                return BadRequest(ModelState);
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
            if (authService.ValidateToken(accesstoken))
            {
                var userrole = authService.DecodeJwtToken(accesstoken);
                var token = authService.GenerateJwtToken(userrole.Item1, userrole.Item2);

                ApplicationUser? AppUser = await workManagementDbContext.Users.FindAsync(userrole.Item1);
                var User = mapper.Map<UserModel>(AppUser);
                User.Role = userrole.Item2;

                return Ok(new { User = User, AccessToken = token });

            }
            else
                return Unauthorized("Invalid access token detected");
        }
        // Other methods: RefreshToken, Logout, etc.

        private async Task<bool> IsValidUser(string username, string password)
        {
            // Your user validation logic here
            // Return true if valid, otherwise false
            ApplicationUser? user = await workManagementDbContext.Users.FindAsync(username);

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


    }

}
