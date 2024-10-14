using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models.Email
{
    public class SMTPSettings
    {
        public string Sender {  get; set; }
        public string Password {  get; set; }
        public int Port {  get; set; }
    }
}
