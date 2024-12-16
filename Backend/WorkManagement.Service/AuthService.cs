using System.Text;

namespace WorkManagement.Service
{
    using AutoMapper;
    using Microsoft.AspNet.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using WorkManagement.API.Controllers;
    using WorkManagement.Domain.Contracts;
    using WorkManagement.Domain.Entity;
    using WorkManagement.Domain.Models;
    using WorkManagmentSolution.EFCore;

    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> userManager;
        private readonly IPermissionService permissionService;
        public AuthService(IConfiguration configuration, Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> userManager, IPermissionService permissionService)
        {
            _configuration = configuration;
            this.userManager = userManager;
            this.permissionService = permissionService;
        }


        public string GenerateJwtToken(string email, string role, string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_configuration["ApiSettings:JwtOptions:Secret"]);

            var claimList = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email,email),
                new Claim(JwtRegisteredClaimNames.Name,email),
                new Claim(JwtRegisteredClaimNames.NameId,userId),
                    new Claim(ClaimTypes.Role,role)
                };

            var permissionsClaim = permissionService.GetPermissionClaimsByUserAsync(Guid.Parse(userId)).Result;

            // Serialize the hierarchical permissions into a JSON string
            string permissionsJson = JsonConvert.SerializeObject(permissionsClaim);

            //Adding permissions to the claims
            claimList.Add(new Claim("Permissions", permissionsJson));


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claimList),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["ApiSettings:JwtOptions:Issuer"],
                Audience = _configuration["ApiSettings:JwtOptions:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    public bool ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false, // Set to true if you want to validate issuer
                ValidateAudience = false, // Set to true if you want to validate audience
                ClockSkew = TimeSpan.Zero // No tolerance for token expiration
            }, out SecurityToken validatedToken);

            // Token is valid
            return true;
        }
        catch
        {
            // Token validation failed
            return false;
        }
    }

    public Tuple<string, string, string> DecodeJwtToken(string jwtToken)
    {
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(jwtToken);

        // Now you can access token.Claims to retrieve user information
        var userId = token.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
        var userName = token.Claims.FirstOrDefault(c => c.Type == "name")?.Value;
        var role = token.Claims.FirstOrDefault(c => c.Type == "role")?.Value;
        var nameId = token.Claims.FirstOrDefault(c => c.Type == "nameid")?.Value;


        // Do something with userId and userName (e.g., log them or use them in your application)
        return new Tuple<string, string, string>(userName, role, nameId); // Return the user ID if needed
    }

}
}