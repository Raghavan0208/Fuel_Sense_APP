using Invent.Helper;

namespace StarZero.ViewEntities;

public class FuelType : EntityBase
{
    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public bool DisplayInList { get; set; }

    public int RowOrder { get; set; }
}
