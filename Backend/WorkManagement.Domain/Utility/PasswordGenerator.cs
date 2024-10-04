using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Utility
{
    public class PasswordGenerator
    {
        private static readonly Random Random = new Random();

        public string GenerateRandomPassword(int length)
        {
            var passwordBuilder = new StringBuilder();

            // Generate a random string (letters)
            for (int i = 0; i < length / 2; i++)
            {
                char randomChar = Convert.ToChar(Random.Next(65, 91)); // ASCII codes for uppercase letters
                passwordBuilder.Append(randomChar);
            }

            // Generate a random number
            int randomNumber = Random.Next(1000, 9999);
            passwordBuilder.Append(randomNumber);

            // Generate another random string (letters)
            for (int i = 0; i < length / 2; i++)
            {
                char randomChar = Convert.ToChar(Random.Next(97, 123)); // ASCII codes for lowercase letters
                passwordBuilder.Append(randomChar);
            }

            return passwordBuilder.ToString();
        }
    }
}
