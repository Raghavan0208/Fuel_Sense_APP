using Invent.Helper;

namespace StarZero.DBO;

public class Brand : EntityBase
{
    public long VehicleTypeId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public bool DisplayInList { get; set; }

    public int RowOrder { get; set; }
}
