using Invent.Helper;

namespace StarZero.DBO;

public class PendingEmail : EntityBase
{
    public long EmailTemplateId { get; set; }

    public bool IsProcessed { get; set; }

    public string parms { get; set; }

    public string EmailTo { get; set; }

    public string EmailFrom { get; set; }

    public string Attachment { get; set; }
}
