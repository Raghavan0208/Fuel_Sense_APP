using Invent.Helper;

namespace StarZero.DBO;

public class UserVehicle : EntityBase
{
    public long? LoginId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? RegistrationNumber { get; set; }

    public DateTime? RegistrationDate { get; set; }

    public long? VehicleTypeId { get; set; }

    public long? BrandVariantId { get; set; }

    public long? FuelTypeId { get; set; }

    public decimal? CO2Emission { get; set; }
}
