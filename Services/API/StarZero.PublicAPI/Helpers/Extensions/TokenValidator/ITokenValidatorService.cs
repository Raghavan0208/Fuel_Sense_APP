namespace StarZero.API.Helpers;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Threading.Tasks;

public interface ITokenValidatorService
{
    /// <summary>
    /// Validate Token
    /// </summary>
    /// <param name="context"></param>
    Task ValidateToken(TokenValidatedContext context);
}
