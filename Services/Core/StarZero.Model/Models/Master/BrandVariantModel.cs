using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using iText.Commons.Actions.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.DBO;
using StarZero.Helper;
using System.Security.Principal;

namespace StarZero.Model; 

public class BrandVariantModel : BaseModel<DBO.BrandVariant>, IBrandVariantModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public BrandVariantModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }
    public ViewEntities.BrandVariant Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.BrandVariant, ViewEntities.BrandVariant>(result);

            return mapperResult;
        }

        return default;
    }

    public ViewEntities.BrandVariant GetNameOrAddItem(ViewEntities.UserVehicle userVehicle)
    {
        var result = this.FindItem(item => item.Name == userVehicle.BrandVariant && item.Active == true);

        if (result is null)
        {
            var brandVariantData = new BrandVariant();

            brandVariantData.BrandSeriesId = userVehicle.BrandSeriesId;
            brandVariantData.Name = userVehicle.BrandVariant;
            brandVariantData.DisplayName = userVehicle.BrandVariant;
            brandVariantData.EnumName = userVehicle.BrandVariant;
            brandVariantData.FuelTypeId = userVehicle.FuelTypeId;
            brandVariantData.DisplayInList = true;

            var BrandVariantId = this.AddItem(brandVariantData);

            brandVariantData.Id = BrandVariantId;

            var mapperResult = this.mapper.Map<DBO.BrandVariant, ViewEntities.BrandVariant>(brandVariantData);

            return mapperResult;
        }

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.BrandVariant, ViewEntities.BrandVariant>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.BrandVariant> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandVariant>, IEnumerable<ViewEntities.BrandVariant>>(results);
        return mapperResult;
    }

    public long Post(ViewEntities.BrandVariant item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandVariant, DBO.BrandVariant>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.BrandVariant item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandVariant, DBO.BrandVariant>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.BrandVariant item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandVariant, DBO.BrandVariant>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.BrandVariant item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandVariant, DBO.BrandVariant>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public bool Remove(long id)
    {
        var BrandMaster = this.FindItemById(id);

        if (BrandMaster is not null)
        {
            BrandMaster.Active = false;
            this.UpdateItem(BrandMaster);

            return true;
        }

        return false;

     }
    public IEnumerable<ViewEntities.BrandVariant> GetBrandVariantByBrandSeriesId(long brandSeriesId)
    {
        var result = this.FindItems(item => item.BrandSeriesId == brandSeriesId && item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandVariant>, IEnumerable<ViewEntities.BrandVariant>>(result);

            return mapperResult;
        }

        return default;
    }

}
