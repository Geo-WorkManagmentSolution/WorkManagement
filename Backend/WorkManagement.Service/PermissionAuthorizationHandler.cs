﻿namespace WorkManagement.Service
{
    using Microsoft.AspNetCore.Authorization;
    using Newtonsoft.Json;
    using System.Security.Claims;
    using WorkManagement.API.Controllers;
    using WorkManagement.Domain.Entity;

    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            var user = context.User;
            if (user == null || !user.Identity.IsAuthenticated)
            {
                context.Fail();
                return Task.CompletedTask;
            }

            bool isAuthorized = CheckUserPermission(user, (PermissionActionEnum)Enum.Parse(typeof(PermissionActionEnum), requirement.Permission));
            if (isAuthorized)
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }

            return Task.CompletedTask;
        }

        private bool CheckUserPermission(ClaimsPrincipal user, PermissionActionEnum permissionAction)
        {
            var permissionsString = user.FindFirst("Permissions")?.Value;

            if (string.IsNullOrEmpty(permissionsString))
            {
                return false;
            }

            var permissions = JsonConvert.DeserializeObject<PermissionCategoryClaim>(permissionsString);

            // Now check the hierarchical structure for the specific permission action
            return HasRequiredPermission(permissions, permissionAction);
        }

        private bool HasRequiredPermission(PermissionCategoryClaim permissionActionClaims, PermissionActionEnum requiredPermission)
        {
            foreach (var categoryAction in permissionActionClaims.Actions)
            {
                if (categoryAction.Id == requiredPermission)
                {
                    return true;
                }
            }
            return false;
        }
    }
}