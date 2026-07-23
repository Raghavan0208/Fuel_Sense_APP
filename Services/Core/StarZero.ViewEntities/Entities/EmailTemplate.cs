using Invent.Helper;

namespace StarZero.ViewEntities;

public class EmailTemplate : EntityBase
{
    public string Templatename { get; set; }

    public string DisplayName { get; set; }

    public string Template { get; set; }

    public string EmailSubject { get; set; }

    public string EmailCC { get; set; }

    public string EmailBCC { get; set; }

    public string SenderEmail { get; set; }

    public string AdditionalInformation { get; set; }

    public string EnumName { get; set; }

    public bool AttachmentRequired { get; set; }
}
