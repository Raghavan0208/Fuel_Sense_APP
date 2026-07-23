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

public class BrandSeriesModel : BaseModel<DBO.BrandSeries>, IBrandSeriesModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public BrandSeriesModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }
    public ViewEntities.BrandSeries Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.BrandSeries, ViewEntities.BrandSeries>(result);

            return mapperResult;
        }

        return default;
    }

    public ViewEntities.BrandSeries GetNameOrAddItem(ViewEntities.UserVehicle userVehicle)
    {
        var result = this.FindItem(item => item.Name == userVehicle.BrandSeriesName && item.Active == true);

        if(result is null)
        {
            var brandSeriesData = new BrandSeries();

            brandSeriesData.BrandId = userVehicle.BrandId;
            brandSeriesData.Name = userVehicle.BrandSeriesName;
            brandSeriesData.DisplayName = userVehicle.BrandSeriesName;
            brandSeriesData.EnumName = userVehicle.BrandSeriesName;
            brandSeriesData.DisplayInList = true;

            var brandSeriesId = this.AddItem(brandSeriesData);

            brandSeriesData.Id = brandSeriesId;

            var mapperResult = this.mapper.Map<DBO.BrandSeries, ViewEntities.BrandSeries>(brandSeriesData);

            return mapperResult;
        }


        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.BrandSeries, ViewEntities.BrandSeries>(result);

            return mapperResult;
        }

        return default;
    }


    public IEnumerable<ViewEntities.BrandSeries> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandSeries>, IEnumerable<ViewEntities.BrandSeries>>(results);
        return mapperResult;
    }

    public long Post(ViewEntities.BrandSeries item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandSeries, DBO.BrandSeries>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.BrandSeries item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandSeries, DBO.BrandSeries>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.BrandSeries item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandSeries, DBO.BrandSeries>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.BrandSeries item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandSeries, DBO.BrandSeries>(item);
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

    public IEnumerable<ViewEntities.BrandSeries> GetBrandSeriesByBrandId(long brandId)
    {
        var result = this.FindItems(item => item.BrandId == brandId && item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandSeries>, IEnumerable<ViewEntities.BrandSeries>>(result);

            return mapperResult;
        }

        return default;
    }

}
