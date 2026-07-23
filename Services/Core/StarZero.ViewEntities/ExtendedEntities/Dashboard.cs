using Invent.Helper;

namespace StarZero.ViewEntities;

public class Dashboard: EntityBase
{
    public long CurrentEmission { get; set; }

    public DateTime PurchaseDate { get; set; }

    public long StatusId {get; set; }

    public long LoginId { get; set; }

    public string BrandName { get; set; }

    public string BrandSeriesName { get; set; }

    public string BrandVariantName { get; set; }

    public string VehicleTypeName { get; set; }

    public string PlanName { get; set; }

    public string PlanDescription { get; set;}

    public long LastEmission { get; set; }

    public decimal StartingReading { get; set; }

    public decimal LastReading { get; set; }

    public decimal EmissionStandard { get; set; }
}
  