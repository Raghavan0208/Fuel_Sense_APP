using Invent.Helper;

namespace StarZero.DBO;

public class PlanReading : EntityBase
{
    public long UserPlanId { get; set; }

    public DateTime? EntryDate { get; set; }

    public decimal Reading { get; set; }

    public decimal Distance { get; set; }

    public decimal Co2Emission { get; set; }

    public string ReadingImagePath { get; set; }

    public long? RowOrder { get; set; }

    public string Name { get; set; }

    public string ImageName { get; set; }
}
