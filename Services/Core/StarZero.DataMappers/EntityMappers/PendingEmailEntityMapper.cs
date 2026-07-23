using AutoMapper;

namespace StarZero.DataMappers;

public class PendingEmailEntityMapper : ITypeConverter<DBO.PendingEmail, ViewEntities.PendingEmail>
{
    public ViewEntities.PendingEmail Convert(DBO.PendingEmail source, ViewEntities.PendingEmail destination, ResolutionContext context)
    {
        return new ViewEntities.PendingEmail
        {
            Id = source?.Id ?? 0,
            EmailTemplateId = source?.EmailTemplateId?? 0,
            IsProcessed = source?.IsProcessed?? false,
            parms = source?.parms,
            EmailTo = source?.EmailTo,
            EmailFrom = source?.EmailFrom,
            Attachment = source?.Attachment,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}