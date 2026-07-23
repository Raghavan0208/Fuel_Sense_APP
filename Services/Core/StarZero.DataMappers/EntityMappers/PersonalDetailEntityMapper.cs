using AutoMapper;

namespace StarZero.DataMappers;

public class PersonalDetailEntityMapper : ITypeConverter<DBO.PersonalDetail, ViewEntities.PersonalDetail>
{
    public ViewEntities.PersonalDetail Convert(DBO.PersonalDetail source, ViewEntities.PersonalDetail destination, ResolutionContext context)
    {
        return new ViewEntities.PersonalDetail
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