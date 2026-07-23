
using StarZero.Contracts;
using System;

namespace StarZero.PublicAPI.Controllers;

[Authorize]
[Route("v1/registration")]
public class RegistrationController :  BaseController<IRegistrationModel, Registration>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IRegistrationModel registrationModel;
    private IMapper mapper;
    private readonly CountryContext context;

    public RegistrationController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IRegistrationModel iRegistrationModel, CountryContext iContext)
        : base(iRegistrationModel, iAppConfiguration)
    {
        this.appConfiguration = iAppConfiguration;
        this.registrationModel = iRegistrationModel;
        this.mapper = iMapper;
        this.context = iContext;
    }

    [HttpGet]
    [Route("View")]
    public async Task<IActionResult> View([FromQuery] long loginId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Get(loginId);
        });

        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> Create([FromBody] Registration item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        if (result < 0) { return Content("Already registered user"); }

        return Ok(result);
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<IActionResult> Edit([FromBody] Registration item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        if (result < 0) { return Content("Already registered user"); }

        return Ok(result);
    }
     
    [HttpGet]
    [Route("RegisteredUserName/{userName}")]
    public async Task<IActionResult> RegisteredUserName(string userName)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetValidateUserName(userName);
        });

        if (result != "") { return Content("You are already Registered User."); }

        return Ok(result);
    }

    [HttpGet]
    [Route("RegisteredMobileNo/{mobileNo}")]
    public async Task<IActionResult> RegisteredMobileNo(long mobileNo)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetValidateByMobileNo(mobileNo);
        });

        if (result != "") { return Content("You are already Registered MobileNo."); }

        return Ok(result);
    }


    [HttpGet]
    [Route("CancelSubscription/{id}")]
    public async Task<long> CancelSubscription(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.CancelSubscription(id);
        });

        return result;
    }

    [HttpGet]
    [Route("GetCurrentPlanByLoginId/{id}")]
    public async Task<UserPlan> GetCurrentPlanByLoginId(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCurrentPlanByLoginId(id);
        });

        return result;
    }


    [HttpGet]
    [Route("GetProfileImage/{loginid}")]
    public async Task<IActionResult> GetProfileImage(long loginid)
    {
        (byte[] fileContent, string fileName) = await this.Contract.GetProfileImage(loginid);

        this.Response.Headers.Add("Content-Disposition", "inline;filename=\"" + fileName + "\"");
        return new FileContentResult(fileContent, $"image/{Path.GetExtension(fileName)}");
    }

    [HttpGet]
    [Route("GetBase64ProfileImage/{loginid}")]
    public async Task<string> GetBase64ProfileImage(long loginid)
    {
        var result = await this.Contract.GetBase64ProfileImages(loginid);

        return result;
    }

    [HttpPost]
    [Route("UploadProfileImage")]
    public async Task<long> UploadProfileImage(long loginid, [FromForm] IFormFileCollection uploadImage)
    {
        var result = await Task.Run(() =>
        {
            return Contract.UploadProfileImages(loginid, uploadImage);
        });

        return result;
    }
}