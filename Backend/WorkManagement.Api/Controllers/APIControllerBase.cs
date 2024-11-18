using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Security.Claims;

namespace WorkManagement.API.Controllers
{
    public class APIControllerBase : ControllerBase
    {
        public string? LoggedInUserId { get; set; }
        public APIControllerBase() {
            LoggedInUserId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
