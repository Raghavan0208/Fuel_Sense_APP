using Invent.Helper;

namespace StarZero.DBO;

public class UserPlan : EntityBase
{
    public long UserVehicleId { get; set; }

    public long PlanId { get; set; }

    public long StatusId { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public long TreeLimit { get; set; }

    public decimal PlanAmount { get; set; }

    public decimal MaximumEmission { get; set; }

    public decimal CurrentEmission { get; set; }

    public bool IsNewVehicle { get; set; }

    public decimal? StartingReading { get; set; }
}
