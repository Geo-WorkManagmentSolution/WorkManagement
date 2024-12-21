using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Contracts
{
    public interface IAuthService
    {
        public string GenerateJwtToken(List<Claim> claimList);
        public string GenerateJwtToken(string Email, string role, string UserId);

        public bool ValidateToken(string token);

        public Tuple<string, string,string> DecodeJwtToken(string jwtToken);
    }
}
