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

public class FuelTypeModel : BaseModel<DBO.FuelType>, IFuelTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public FuelTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }

    public long Post(ViewEntities.FuelType item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.FuelType, DBO.FuelType>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.FuelType item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.FuelType, DBO.FuelType>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.FuelType item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.FuelType, DBO.FuelType>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.FuelType item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.FuelType, DBO.FuelType>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }


    public ViewEntities.FuelType GetNameOrAddItem(ViewEntities.UserVehicle userVehicle)
    {
        var result = this.FindItem(item => item.Name.ToLower() == userVehicle.FuelTypeName.ToLower() && item.Active == true);


        if (result is null)
        {
            var FuelType = new FuelType();

            FuelType.Name = userVehicle.FuelTypeName;
            FuelType.DisplayName = userVehicle.FuelTypeName;
            FuelType.EnumName = userVehicle.FuelTypeName;
            FuelType.DisplayInList = true;

            var Id = this.AddItem(FuelType);

            FuelType.Id = Id;

            var mapperResult = this.mapper.Map<DBO.FuelType, ViewEntities.FuelType>(FuelType);

            return mapperResult;

        }
        else if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.FuelType, ViewEntities.FuelType>(result);

            return mapperResult;
        }

        return default;
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
    public ViewEntities.FuelType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.FuelType, ViewEntities.FuelType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.FuelType> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.FuelType>, IEnumerable<ViewEntities.FuelType>>(results);
        return mapperResult;
    }
}
