using AutoMapper;

namespace StarZero.DataMappers;

public class EmailTemplateEntityMapper : ITypeConverter<DBO.EmailTemplate, ViewEntities.EmailTemplate>
{
    public ViewEntities.EmailTemplate Convert(DBO.EmailTemplate source, ViewEntities.EmailTemplate destination, ResolutionContext context)
    {
        return new ViewEntities.EmailTemplate
        {
            Id = source?.Id ?? 0,
            Templatename = source?.Templatename,
            DisplayName = source?.DisplayName,
            Template = source?.Template,
            EmailSubject = source?.EmailSubject,
            EmailCC = source?.EmailCC,
            EmailBCC = source?.EmailCC,
            SenderEmail = source?.SenderEmail,
            AdditionalInformation = source?.AdditionalInformation,
            EnumName = source?.EnumName,
            AttachmentRequired = source?.AttachmentRequired?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}