using AutoMapper;

namespace StarZero.DataMappers;
public class ContactUsModelMapper : ITypeConverter<ViewEntities.ContactUs, DBO.ContactUs>
{
    public DBO.ContactUs Convert(ViewEntities.ContactUs source, DBO.ContactUs destination, ResolutionContext context)
    {
        return new DBO.ContactUs
        {
            Id = source?.Id ?? 0,
            Name = source?.Name ?? string.Empty,
            Mobile = source?.Mobile ?? string.Empty,
            Email = source?.Email ?? string.Empty,
            Description = source?.Description ?? string.Empty,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
