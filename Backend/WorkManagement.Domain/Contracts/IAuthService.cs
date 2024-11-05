using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Contracts
{
    public interface IAuthService
    {
        public string GenerateJwtToken(string email, string role,string Id);

        public bool ValidateToken(string token);

        public Tuple<string, string,string> DecodeJwtToken(string jwtToken);
    }
}
