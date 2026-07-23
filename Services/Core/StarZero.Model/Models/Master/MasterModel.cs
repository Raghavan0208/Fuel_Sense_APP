using AutoMapper;
using Invent.DAL;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Contracts.Interface.Master;
using StarZero.Helper;
using StarZero.ViewEntities;
using System.Security.Principal;

namespace StarZero.Model.Models.Master;

public class MasterModel : BaseModel<DBO.Plans>, IMasterModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public MasterModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(iContext, iConfig.Value.DatabaseConfiguration);
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }

    public IEnumerable<ViewEntities.Blogs> GetList()
    {
        var mapperResult = new BlogsModel(this.config, this.mapper, this.iPrincipal, this.context).GetList();
        return mapperResult;
    }

    public IEnumerable<ViewEntities.Plans> GetVehicleTypeId(int vehicletypeid)
    {
        var result = this.FindItems(item => item.VehicleTypeId == vehicletypeid);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.Plans>, IEnumerable<ViewEntities.Plans>>(result);
            return mapperResult;
        }
        return default;
    }

    public Plans Get(long id)
    {
        throw new NotImplementedException();
    }

    IEnumerable<Plans> IBaseModel<Plans>.GetList()
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ViewEntities.VehicleType> GetAllVehicleTypeList()
    {
        var mapperResult = new VehicleTypeModel(this.config, this.mapper, this.iPrincipal, this.context).GetList();
        return mapperResult;
    }

    public IEnumerable<ViewEntities.FuelType> GetFuelTypeList()
    {
        var mapperResult = new FuelTypeModel(this.config, this.mapper, this.iPrincipal, this.context).GetList();
        return mapperResult;
    }

    public IEnumerable<ViewEntities.Brand> GetBrandList()
    {
        var mapperResult = new BrandModel(this.config, this.mapper, this.iPrincipal, this.context).GetList();
        return mapperResult;
    }

    public IEnumerable<ViewEntities.BrandVariant> GetBrandVarientList()
    {
        var mapperResult = new BrandVariantModel(this.config, this.mapper, this.iPrincipal, this.context).GetList();
        return mapperResult;
    }

    public IEnumerable<ViewEntities.EmissionCategory> GetlEmissionCategoryList()
    {
        var mapperResult = new EmissionCategoryModel(this.config, this.mapper, this.iPrincipal, this.context).GetList();
        return mapperResult;
    }

    public IEnumerable<ViewEntities.Brand> GetBrandByVehicleTypeId(long vehicleTypeId)
    {
        var result = new BrandModel(this.config, this.mapper, this.iPrincipal, this.context)
            .GetBrandByVehicleTypeId(vehicleTypeId);

        return result;
    }

    public IEnumerable<ViewEntities.BrandVariant> GetBrandVariantByBrandSeriesId(long brandSeriesId)
    {
        var result = new BrandVariantModel(this.config, this.mapper, this.iPrincipal, this.context)
            .GetBrandVariantByBrandSeriesId(brandSeriesId);

        return result;
    }

    public IEnumerable<ViewEntities.BrandSeries> GetBrandSeriesByBrandId(long brandId)
    {
        var result = new BrandSeriesModel(this.config, this.mapper, this.iPrincipal, this.context)
            .GetBrandSeriesByBrandId(brandId);

        return result;
    }

    public IEnumerable<Country> GetAllCountrybyCountryCodeList()
    {
        var mapperResult = new CountryModel(this.config, this.mapper, this.iPrincipal, this.context).GetListByCountryCode(this.context?.CountryCode ?? string.Empty);
        return mapperResult;
    }

    public IEnumerable<CarousalBanner> GetCarousalBannerList()
    {
        var mapperResult = new CarousalBannerModel(this.config, this.mapper, this.iPrincipal, this.context).GetListByCountryCode(this.context?.CountryCode ?? string.Empty);
        return mapperResult;
    }

    public IEnumerable<Address> GetAddressList()
    {
        var mapperResult = new AddressModel(this.config, this.mapper, this.iPrincipal, this.context).GetListByCountryCode(this.context?.CountryCode ?? string.Empty);
        return mapperResult;
    }
    

    public IEnumerable<Blogs> GetBlogsList()
    {
        var mapperResult = new BlogsModel(this.config, this.mapper, this.iPrincipal, this.context).GetListByCountryCode(this.context?.CountryCode ?? string.Empty);
        return mapperResult;
    }

    public  IEnumerable<Country>  GetCountryList()
    {
        var mapperResult = new CountryModel(this.config, this.mapper, this.iPrincipal, this.context).GetList();
        return mapperResult;
    }
}
