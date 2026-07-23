using iText.Commons.Actions.Contexts;
using StarZero.Contracts.Interface.Master;

namespace StarZero.PublicAPI.Controllers;

[AllowAnonymous]
[Route("v1/ContactUs")]
public class ContactUsController : BaseController<IContactUsModel, ContactUs>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IContactUsModel contactUSModel;
    private IMapper mapper;
    private readonly CountryContext context;

    public ContactUsController(IOptionsSnapshot<AppConfiguration> iAppConfigurationIMapper, IMapper mapper, IContactUsModel iContract, CountryContext iContext) 
        : base(iContract, iAppConfigurationIMapper)
    {
        this.appConfiguration = iAppConfigurationIMapper;
        this.contactUSModel = iContract;
        this.mapper = mapper;
        this.context = iContext;
    }

    /// <summary>
    /// The Contact details are save into contactus table
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    [HttpPost]
    [Route("Create")]
    public async Task<long> Create([FromBody] ViewEntities.ContactUs contactUs)
    {
        var reault = await Task.Run(() =>
        {
            return this.Contract.Post(contactUs);
        });

        return reault;
    }
}
