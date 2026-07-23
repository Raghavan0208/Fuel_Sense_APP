using Invent.Helper;

namespace StarZero.DBO;

public class Plans : EntityBase
{
    public int VehicleTypeId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string Description { get; set; }

    public int TreeCount { get; set; }

    public string EnumName { get; set; }

    public decimal Amount { get; set; }

    public bool IsMostPopular { get; set; }

    public bool DisplayInList { get; set; }

    public int RowOrder { get; set; }

    public long TreeFrequency { get; set; }

    public long TreesToPlant { get; set; }

    public long FinaltreeCount { get; set; }

    public long CO2limit { get; set; }
}
