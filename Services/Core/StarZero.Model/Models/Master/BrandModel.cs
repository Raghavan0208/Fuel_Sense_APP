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
public class BrandModel : BaseModel<DBO.Brand>, IBrandModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public BrandModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }

    public ViewEntities.Brand Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Brand, ViewEntities.Brand>(result);

            return mapperResult;
        }

        return default;
    }

    public ViewEntities.Brand GetNameOrAddItem(ViewEntities.UserVehicle userVehicle)
    {
        var result = this.FindItem(item => item.Name == userVehicle.BrandName && item.Active == true);


        if (result is null)
        {
            var brandData = new Brand();

            brandData.Name = userVehicle.BrandName;
            brandData.DisplayName = userVehicle.BrandName;
            brandData.EnumName = userVehicle.BrandName;
            brandData.VehicleTypeId = userVehicle.VehicleTypeId;
            brandData.DisplayInList = true; 

            var Id = this.AddItem(brandData);

            brandData.Id = Id;

            var mapperResult = this.mapper.Map<DBO.Brand, ViewEntities.Brand>(brandData);

            return mapperResult;
          
        }
        else if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Brand, ViewEntities.Brand>(result);

            return mapperResult;
        }

        return default;
    }


    public IEnumerable<ViewEntities.Brand> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Brand>, IEnumerable<ViewEntities.Brand>>(results);
        return mapperResult;
    }

    public long Post(ViewEntities.Brand item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Brand, DBO.Brand>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.Brand item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Brand, DBO.Brand>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Brand item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Brand, DBO.Brand>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Brand item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Brand, DBO.Brand>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
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

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ViewEntities.Brand> GetBrandByVehicleTypeId(long vehicleTypeId)
    {
        var result = this.FindItems(item => item.VehicleTypeId == vehicleTypeId && item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.Brand>, IEnumerable<ViewEntities.Brand>>(result);

            return mapperResult;
        }

        return default;
    }

}
