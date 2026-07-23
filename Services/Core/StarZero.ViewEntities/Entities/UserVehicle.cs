using Invent.Helper;

namespace StarZero.ViewEntities;

public class UserVehicle : EntityBase
{
    public long? LoginId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string RegistrationNumber { get; set; }

    public DateTime? RegistrationDate { get; set; }

    public long VehicleTypeId { get; set; }

    public long BrandVariantId { get; set; }

    public long FuelTypeId { get; set; }

    public decimal CO2Emission { get; set; }

    public string? VehicleType { get; set; }

    public string? BrandName { get; set; }

    public string? BrandVariant { get; set; }

    public string? FuelTypeName { get; set; }

    public string? EmissionType { get; set; }

    public long BrandId { get; set; }

    public long BrandSeriesId { get; set; }

    public string? BrandSeriesName { get; set; }
}
