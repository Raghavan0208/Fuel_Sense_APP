using Invent.Helper;

namespace StarZero.DBO;

public class UserPlanTree : EntityBase
{
    public long UserPlanId { get; set; }

    public long UserPlanTaskId { get; set; }

    public long TreeTypeId { get; set; }

    public DateTime? PlantedDate { get; set; }

    public string GeoLocation { get; set; }

    public long PlantedBy { get; set; }

    public long? RowOrder { get; set; }
}
