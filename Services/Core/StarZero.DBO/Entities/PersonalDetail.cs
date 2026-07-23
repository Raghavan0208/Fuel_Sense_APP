using Invent.Helper;

namespace StarZero.DBO;

public class PersonalDetail : EntityBase
{
    public long? LoginId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public long MobileNumber { get; set; }

    public long CountryId { get; set; }

    public string Address { get; set; }

    public string PostalCode { get; set; }

    public string? ProfileImage { get; set; }
}
