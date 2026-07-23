using iText.Commons.Actions.Contexts;

namespace StarZero.PublicAPI.Controllers;

[Authorize]
[Route("v1/Journey")]
public class JourneyController : BaseController<IPlanReadingModel,PlanReading>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPlanReadingModel PlanReadingModel;
    private readonly CountryContext context;

    public JourneyController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPlanReadingModel iPlanReadingModel, CountryContext iContext) 
        : base(iPlanReadingModel, iAppConfiguration)
    {
        this.appConfiguration = iAppConfiguration;
        this.PlanReadingModel = iPlanReadingModel;
        this.context = iContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Creates([FromForm] PlanReading item)
    {
        var reault = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return reault;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit([FromForm] PlanReading item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpGet]
    [Route("GetPlanReadingImage")]
    public async Task<IActionResult> GetPlanReadingImage([FromQuery] long id)
    {
        (byte[] fileContent, string fileName) = await this.Contract.GetPlanReadingImages(id);

        this.Response.Headers.Add("Content-Disposition", "inline;filename=\"" + fileName + "\"");
        return new FileContentResult(fileContent, $"image/{Path.GetExtension(fileName)}");
    }

    [HttpGet]
    [Route("GetBase64PlanReadingImage")]
    public async Task<string> GetBase64PlanReadingImage([FromQuery] long id)
    {
        var result = await this.Contract.GetBase64PlanReadingImages(id);

        return result;
    }

    [HttpGet]
    [Route("GetAllPlanReading")]
    public async Task<IEnumerable<PlanReading>> GetAllPlanReading(long userplanid)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetPlanReadingList(userplanid);
        });

        return result;
    }

    [HttpGet]
    [Route("GetDashboard")]
    public async Task<Dashboard> GetDashboard(long loginId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetDashboard(loginId);
        });

        return result;
    }

    [HttpPost]
    [Route("RecordReading")]
    public async Task<long> RecordReading(PlanReading item)
    {
        var reault = await Task.Run(() =>
        {
            return this.Contract.PostAppData(item);
        });

        return reault;
    }
}
