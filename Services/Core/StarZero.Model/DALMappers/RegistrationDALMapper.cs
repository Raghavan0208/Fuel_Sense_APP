using Dapper;
using Microsoft.Win32;
using StarZero.DAL.Interfaces;
using StarZero.ViewEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarZero.Model.DALMappers
{
    public class RegistrationDALMapper : IMapper<Registration>
    {
        public Registration Map(SqlMapper.GridReader reader)
        {
            var register = reader.Read<Login>(true); 
            var resultData = reader.Read<Registration>(true);

            if (resultData?.Count() > 0)
            {
                var vehicle = reader.Read<UserVehicle>(true);
                var plan = reader.Read<UserPlan>(true);

                Registration result = new Registration();
                result = resultData?.FirstOrDefault();
                result.LoginDetail = register?.FirstOrDefault();
                result.Vehicle = vehicle?.FirstOrDefault();
                result.Plan = plan?.FirstOrDefault();

                return result;
            }
            return new Registration();
        }
    }
}
