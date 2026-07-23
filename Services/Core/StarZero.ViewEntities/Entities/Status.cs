using Invent.Helper;

namespace StarZero.ViewEntities;

public class Status : EntityBase
{
    public string EntityType { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public string Description { get; set; }

    public long? RowOrder { get; set; }

    public bool DisplayInList { get; set; }
}
