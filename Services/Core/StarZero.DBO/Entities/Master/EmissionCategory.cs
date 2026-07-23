using Invent.Helper;

namespace StarZero.DBO; 

public class EmissionCategory : EntityBase
{
    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string Description { get; set; }

    public decimal CO2Amount { get; set; }

    public string EnumName { get; set; }

    public bool DisplayInList { get; set; }

    public int RowOrder { get; set; }

    public long VehicleTypeId { get; set; }

    public long FuelTypeId { get; set; }
}
