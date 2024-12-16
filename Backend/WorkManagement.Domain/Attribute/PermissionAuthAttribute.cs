using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagement.Service;

namespace WorkManagement.Domain.Attribute
{
    public class PermissionAuthAttribute : AuthorizeAttribute
    {
        const string POLICY_PREFIX = "Permission_";

        public PermissionAuthAttribute(PermissionActionEnum permissionAction)
        {
            Policy = $"{POLICY_PREFIX}{permissionAction.ToString()}";
        }
    }


   


}
