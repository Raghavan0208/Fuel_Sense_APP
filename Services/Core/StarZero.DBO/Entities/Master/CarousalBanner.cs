using Invent.Helper;

namespace StarZero.DBO;

public class CarousalBanner : EntityBase
{
    public string CountryCode { get; set; }

    public string Title { get; set; }

    public string Content { get; set; }

    public string DisplayInList { get; set; }

    public string ThumbnailPath { get; set; }

    public int RowOrder { get; set; }

}
