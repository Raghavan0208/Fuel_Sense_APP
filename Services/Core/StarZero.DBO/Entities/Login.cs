using Invent.Helper;

namespace StarZero.DBO;

public class Login : EntityBase
{
    public string UserName { get; set; }

    public string? PassWord { get; set; }

    public string Salt { get; set; }

    public string IVKey { get; set; }

    public long UserRoleId { get; set; }
}
