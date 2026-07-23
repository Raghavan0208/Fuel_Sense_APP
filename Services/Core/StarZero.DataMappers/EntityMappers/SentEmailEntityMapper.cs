using AutoMapper;

namespace StarZero.DataMappers;

public class SentEmailEntityMapper : ITypeConverter<DBO.SentEmail, ViewEntities.SentEmail>
{
    public ViewEntities.SentEmail Convert(DBO.SentEmail source, ViewEntities.SentEmail destination, ResolutionContext context)
    {
        return new ViewEntities.SentEmail
        {
            Id = source?.Id ?? 0,
            EmailTemplateId = source?.EmailTemplateId ?? 0,
            PendingEmailId = source?.PendingEmailId ?? 0,
            EmailSubject = source?.EmailSubject,
            EmailBody = source?.EmailBody,
            ToAddress = source?.ToAddress,
            FromAddress = source?.FromAddress,
            Attachment = source?.Attachment,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}

