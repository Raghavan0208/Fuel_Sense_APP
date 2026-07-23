using AutoMapper;
using StarZero.Contracts.Interface.Master;
using StarZero.Model;

namespace StarZero.PublicAPI.Controllers;

[AllowAnonymous]
[Route("v1/Master")]
public class MasterController : BaseController<IMasterModel, Plans>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IMasterModel MasterModel;
    private IMapper mapper;
    private readonly CountryContext context;

    public MasterController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper mapper, IMasterModel iMasterModel, CountryContext iContext) 
        : base(iMasterModel, iAppConfiguration)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = mapper;
        this.MasterModel = iMasterModel;
        this.context = iContext;
    }

    [HttpGet]
    [Route("GetPlans/{vehicletypeid}")]
    public async Task<IEnumerable<Plans>> GetVehicletype(int vehicletypeid)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetVehicleTypeId(vehicletypeid);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllVehicleType")]
    public async Task<IEnumerable<VehicleType>> GetAllVehicleTypeList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAllVehicleTypeList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllFuelType")]
    public async Task<IEnumerable<FuelType>> GetAllFuelTypeList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetFuelTypeList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllBrand")]
    public async Task<IEnumerable<Brand>> GetAllBrandList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllBrandVarient")]
    public async Task<IEnumerable<BrandVariant>> GetAllBrandVarientList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandVarientList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllEmissionCategory")]
    public async Task<IEnumerable<EmissionCategory>> GetAlllEmissionCategoryList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetlEmissionCategoryList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetBrandByVehicleTypeId/{vehicleTypeId}")]
    public async Task<IEnumerable<Brand>> GetBrandByVehicleTypeId(long vehicleTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandByVehicleTypeId(vehicleTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetBrandSeriesByBrandId/{brandId}")]
    public async Task<IEnumerable<BrandSeries>> GetBrandSeriesByBrandId(long brandId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandSeriesByBrandId(brandId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetBrandVariantByBrandSeriesId/{brandSeriesId}")]
    public async Task<IEnumerable<BrandVariant>> GetBrandVariantByBrandSeriesId(long brandSeriesId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandVariantByBrandSeriesId(brandSeriesId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllCountrybyCountryCode")]
    public async Task<IEnumerable<Country>> GetAllCountrybyCountryCode()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAllCountrybyCountryCodeList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllCountry")]
    public async Task<IEnumerable<Country>> GetAllCountry()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCountryList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllBannerList")]
    public async Task<IEnumerable<CarousalBanner>> GetAllBanner()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCarousalBannerList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllAddress")]
    public async Task<IEnumerable<Address>> GetAllAddress()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAddressList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllBlogs")]
    public async Task<IEnumerable<Blogs>> GetAllBlogs()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBlogsList();
        });

        return result;
    }
}
