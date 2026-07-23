using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System;
using MySqlX.XDevAPI.Common;
using iText.Commons.Actions.Contexts;

namespace StarZero.PublicAPI.Controllers
{
    [Authorize]
    [Route("v1/Payment")]
    public class PaymentDetailsController : BaseController<IPaymentDetailsModel, PaymentDetails>
    {
        private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
        private readonly IPaymentDetailsModel paymentDetailsModel;
        private readonly CountryContext context;


        public PaymentDetailsController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper mapper, IPaymentDetailsModel ipaymentDetailsModel, CountryContext iContext)
            : base(ipaymentDetailsModel, iAppConfiguration)
        {
            this.appConfiguration = iAppConfiguration;
            this.paymentDetailsModel = ipaymentDetailsModel;
            this.context = iContext;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<long> Create(PaymentDetails item)
        {
            var result = await Task.Run(() =>
            {
                return this.Contract.Post(item);
            });

            return result;
        }

        [HttpGet]
        [Route("GetPaymentDetail")]
        public async Task<PaymentDetails> GetPaymentDetail(long id)
        {
            var result = await Task.Run(() =>
            {
                return this.Contract.Get(id);
            });

            return result;
        }

        [HttpGet]
        [Route("GetRazorPayKey")]
        public async Task<string> GetRazorPayKey()
        {
            string? webtoken = await this.GenerateJSONWebToken();
            return webtoken;
        }

        private async Task<string> GenerateJSONWebToken()
        {
            var token = new JwtTokenBuilder()
                        .AddSecurityKey(JwtSecurityKey.Create(this.appConfiguration?.Value.EncryptionConfiguration?.ClientSecrect))
                        .AddSubject("Token")
                        .AddIssuer(this.appConfiguration?.Value.EncryptionConfiguration?.Issuer)
                        .AddAudience(this.appConfiguration?.Value.EncryptionConfiguration?.Audience)
                        .AddClaim("Key", this.appConfiguration?.Value.RazorPayConfiguration?.RazorPayId)
                        .AddClaim("Secret", this.appConfiguration?.Value.RazorPayConfiguration?.RazorPayKey)
                        .AddExpiry(this.GetExpiryMinutes())
                        .Build(this.CreateClaims());

            return await Task.FromResult(token.Value);
        }

        private int GetExpiryMinutes()
        {
            var currentTime = Helper.Extensions.DateTimeExtensions.GetCurrentIST();
            var nextDay = currentTime.AddDays(1).Date;

            int result = Convert.ToInt32(nextDay.Subtract(currentTime).TotalMinutes);

            return result;
        }

        [NonAction]
        private List<Claim> CreateClaims()
        {
            var claims = new List<Claim>
                {
                    new Claim("Key", this.appConfiguration?.Value.RazorPayConfiguration?.RazorPayId),
                    new Claim("Secret", this.appConfiguration?.Value.RazorPayConfiguration?.RazorPayKey)
                };

            var identity = new ClaimsIdentity(claims, "local", "name", "role");
            this.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

            return claims;
        }

        protected sealed class JwtTokenBuilder
        {
            private SecurityKey securityKey = null;
            private string subject = string.Empty;
            private string issuer = string.Empty;
            private string audience = string.Empty;
            private Dictionary<string, string> claims = new Dictionary<string, string>();
            private int expiryInMinutes = 240;

            public JwtTokenBuilder AddSecurityKey(SecurityKey securityKey)
            {
                this.securityKey = securityKey;
                return this;
            }

            public JwtTokenBuilder AddSubject(string subject)
            {
                this.subject = subject;
                return this;
            }

            public JwtTokenBuilder AddIssuer(string issuer)
            {
                this.issuer = issuer;
                return this;
            }

            public JwtTokenBuilder AddAudience(string audience)
            {
                this.audience = audience;
                return this;
            }

            public JwtTokenBuilder AddClaim(string type, string value)
            {
                this.claims.Add(type, value);
                return this;
            }

            public JwtTokenBuilder AddClaims(Dictionary<string, string> claims)
            {
                this.claims.Union(claims);
                return this;
            }

            public JwtTokenBuilder AddExpiry(int expiryInMinutes)
            {
                this.expiryInMinutes = expiryInMinutes;
                return this;
            }

            public JwtToken Build(List<Claim> claims)
            {
                this.EnsureArguments();

                var token = new JwtSecurityToken(
                                  issuer: this.issuer,
                                  audience: this.audience,
                                  claims: claims,
                                  expires: DateTime.UtcNow.AddMinutes(this.expiryInMinutes),
                                  signingCredentials: new SigningCredentials(
                                                            this.securityKey,
                                                            SecurityAlgorithms.HmacSha256));

                return new JwtToken(token);
            }

            private void EnsureArguments()
            {
                if (this.securityKey == null)
                {
                    throw new ArgumentNullException("Security Key");
                }

                if (string.IsNullOrEmpty(this.subject))
                {
                    throw new ArgumentNullException("Subject");
                }

                if (string.IsNullOrEmpty(this.issuer))
                {
                    throw new ArgumentNullException("Issuer");
                }

                if (string.IsNullOrEmpty(this.audience))
                {
                    throw new ArgumentNullException("Audience");
                }
            }
        }

        protected sealed class JwtToken
        {
            private JwtSecurityToken token;

            internal JwtToken(JwtSecurityToken token)
            {
                this.token = token;
            }

            public DateTime ValidTo => this.token.ValidTo;

            public string Value => new JwtSecurityTokenHandler().WriteToken(this.token);
        }
    }
}
