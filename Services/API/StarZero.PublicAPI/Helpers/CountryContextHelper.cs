using Invent.DAL;

namespace StarZero.PublicAPI.Helpers;

public class CountryContextHelper : CountryContext
{
    private readonly IHttpContextAccessor _accessor;
    public CountryContextHelper(IHttpContextAccessor accessor)
    {
        this._accessor = accessor;
        this.CountryCode = this._accessor.HttpContext.Request.Headers["CountryCode"];
    }
}
