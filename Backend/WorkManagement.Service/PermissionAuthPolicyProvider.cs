using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Service
{


    public class PermissionAuthPolicyProvider : IAuthorizationPolicyProvider
    {
        const string POLICY_PREFIX = "Permission_";
        bool AllowsCachingPolicies => true;

        public Task<AuthorizationPolicy> GetDefaultPolicyAsync()
        {
            throw new NotImplementedException();
        }

        public Task<AuthorizationPolicy?> GetFallbackPolicyAsync()
        {
            throw new NotImplementedException();
        }

        // Policies are looked up by string name, so expect 'parameters' (like age)
        // to be embedded in the policy names. This is abstracted away from developers
        // by the more strongly-typed attributes derived from AuthorizeAttribute
        // (like [MinimumAgeAuthorize()] in this sample)
        public Task<AuthorizationPolicy> GetPolicyAsync(string policyName)
        {
            var permissionAction = policyName.Substring(POLICY_PREFIX.Length, policyName.Length);
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
