using Invent.Helper;

namespace StarZero.ViewEntities;

public class BrandVariant : EntityBase
{
    public long BrandSeriesId { get; set; }

    public long? FuelTypeId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public bool DisplayInList { get; set; }

    public int RowOrder { get; set; }
}
