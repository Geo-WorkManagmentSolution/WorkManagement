using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Service
{
    public class PermissionAuthPolicyProvider : IAuthorizationPolicyProvider
    {
        const string POLICY_PREFIX = "Permission_";
        bool AllowsCachingPolicies => true;
        public DefaultAuthorizationPolicyProvider FallbackPolicyProvider { get; }
        public PermissionAuthPolicyProvider(IOptions<AuthorizationOptions> options)
        {
            FallbackPolicyProvider = new DefaultAuthorizationPolicyProvider(options);
        }

        public Task<AuthorizationPolicy> GetDefaultPolicyAsync() =>
                        FallbackPolicyProvider.GetDefaultPolicyAsync();
        public Task<AuthorizationPolicy?> GetFallbackPolicyAsync() =>
                                FallbackPolicyProvider.GetFallbackPolicyAsync();


        public Task<AuthorizationPolicy> GetPolicyAsync(string policyName)
        {
            var permissionAction = policyName.Substring(POLICY_PREFIX.Length);
            if (policyName.StartsWith(POLICY_PREFIX, StringComparison.OrdinalIgnoreCase))
            {
                var policy = new AuthorizationPolicyBuilder();
                policy.AddRequirements(new PermissionRequirement(permissionAction));
                return Task.FromResult(policy.Build());
            }

            return Task.FromResult<AuthorizationPolicy>(null);
        }
    }
}
