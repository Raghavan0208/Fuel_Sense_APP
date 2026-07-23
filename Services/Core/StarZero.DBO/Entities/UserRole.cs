using Invent.Helper;

namespace StarZero.DBO;

public class UserRole : EntityBase
{
    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public string Description { get; set; }

    public long? RowOrder { get; set; }

    public bool DisplayInList { get; set; }
}
