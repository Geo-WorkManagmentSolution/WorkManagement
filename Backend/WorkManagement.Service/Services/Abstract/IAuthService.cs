using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Service.Services.Abstract
{
    public interface IAuthService
    {
        public string GenerateJwtToken(string email, string role);

        public bool ValidateToken(string token);

        public Tuple<string, string> DecodeJwtToken(string jwtToken);
    }
}
