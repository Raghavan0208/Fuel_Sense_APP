using Invent.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarZero.DBO 
{
    public class ContactUs : EntityBase
    {
        public string Name { get; set; }

        public string Mobile { get; set; }

        public string Email { get; set; }

        public string Description { get; set; }
    }
}
