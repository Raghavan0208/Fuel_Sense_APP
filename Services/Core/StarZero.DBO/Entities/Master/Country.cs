using Invent.Helper;

namespace StarZero.DBO; 

public class Country : EntityBase
{

    public string CountryCode { get; set; } 

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public bool DisplayInList { get; set; }

    public int RowOrder { get; set; }
}
