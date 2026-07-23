using AutoMapper;

namespace StarZero.DataMappers;

public class SentEmailModelMapper : ITypeConverter<ViewEntities.SentEmail, DBO.SentEmail>
{
    public DBO.SentEmail Convert(ViewEntities.SentEmail source, DBO.SentEmail destination, ResolutionContext context)
    {
        return new DBO.SentEmail
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