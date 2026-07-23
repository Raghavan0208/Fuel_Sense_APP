using Invent.Helper;

namespace StarZero.ViewEntities;

public class UserPlan : EntityBase
{
    public long? UserVehicleId { get; set; }

    public long PlanId { get; set; }

    public long StatusId { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public long? TreeLimit { get; set; }

    public decimal? PlanAmount { get; set; }

    public decimal? MaximumEmission { get; set; }

    public decimal? CurrentEmission { get; set; }

    public string? StatusName { get;set; }

    public string? PlanName { get; set; }

    public string? PlanDescription { get; set; }

    public bool IsNewVehicle { get; set; }

    public decimal? StartingReading { get; set; }

    public long? VehicleTypeId { get; set; }

    public long? LoginId { get; set; }
}
