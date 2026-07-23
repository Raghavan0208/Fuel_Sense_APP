using Invent.Helper;

namespace StarZero.DBO;

public class UserPlanTask : EntityBase
{
    public long UserPlanId { get; set; }

    public long UserReadingId { get; set; }

    public int TreeCount { get; set; }

    public int PlantedCount { get; set; }    

    public long AssignedTo { get; set; }
}
