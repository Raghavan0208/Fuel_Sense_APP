using Invent.Helper;

namespace StarZero.DBO;

public class Address : EntityBase
{
    public string CountryCode { get; set; }

    public string Address1 { get; set; }

    public string Address2 { get; set; }

    public string CityName { get; set; }

    public string StateName { get; set; }

    public string Country { get; set; }

    public string PinCode { get; set; }

    public string ContactNumber1 { get; set; }

    public string ContactNumber2 { get; set; }

    public int RowOrder { get; set; }

}
