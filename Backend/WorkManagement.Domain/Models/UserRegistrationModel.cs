using System.ComponentModel.DataAnnotations;

namespace WorkManagement.Domain.Models
{
    public class UserRegistrationModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "DisplayName is required")]
        public string DisplayName { get; set; }


        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

}