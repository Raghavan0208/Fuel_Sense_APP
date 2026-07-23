using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarZero.DataMappers;

public class PersonalDetailModelMapper : ITypeConverter<ViewEntities.PersonalDetail, DBO.PersonalDetail>
{
    public DBO.PersonalDetail Convert(ViewEntities.PersonalDetail source, DBO.PersonalDetail destination, ResolutionContext context)
    {
        return new DBO.PersonalDetail
        {
            Id = source?.Id ?? 0,
            LoginId = source?.LoginId ?? 0,
            FirstName = source?.FirstName,
            LastName = source?.LastName,
            Email = source?.Email,
            MobileNumber = source?.MobileNumber ?? 0,
            CountryId = source?.CountryId ?? 0,
            Address = source?.Address,
            PostalCode = source?.PostalCode,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}


