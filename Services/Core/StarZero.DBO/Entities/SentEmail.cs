using Invent.Helper;

namespace StarZero.DBO;

public class SentEmail : EntityBase
{
    public long EmailTemplateId { get; set; }

    public long PendingEmailId { get; set; }

    public string EmailSubject { get; set; }

    public string EmailBody { get; set; }

    public string ToAddress { get; set; }

    public string FromAddress { get; set; }

    public string Attachment { get; set; }
}
