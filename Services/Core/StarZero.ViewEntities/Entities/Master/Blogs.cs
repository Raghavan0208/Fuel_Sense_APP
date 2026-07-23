using Invent.Helper;

namespace StarZero.ViewEntities;

public class Blogs : EntityBase
{
    public string CountryCode { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string Description { get; set; }

    public string EnumName { get; set; }

    public bool DisplayInList { get; set; }

    public int RowOrder { get; set; }

    public string ImageName { get; set; }

    public string BlogURL { get; set; }

    public string BlogsLink { get; set; }
}
