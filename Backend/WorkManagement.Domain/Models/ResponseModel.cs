using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models
{
    public class ResponseModel
    {
        public Object? Data { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
