using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace StarZero.Model;
public class UserVehicleModel : BaseModel<DBO.UserVehicle>, IUserVehicleModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public UserVehicleModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
    }

    public ViewEntities.UserVehicle Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserVehicle, ViewEntities.UserVehicle>(result);

            return mapperResult;
        }

        return default;
    }

    public ViewEntities.UserVehicle GetUserVehicleByLogin(long id)
    {
        var result = this.FindItem(item => item.LoginId == id && item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserVehicle, ViewEntities.UserVehicle>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.UserVehicle> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.UserVehicle>, IEnumerable<ViewEntities.UserVehicle>>(results);

        return mapperResults;
    }

    public long Post(ViewEntities.UserVehicle item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserVehicle, DBO.UserVehicle>(item);
        var fuel = new EmissionCategoryModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.FuelTypeId == item.FuelTypeId && x.VehicleTypeId == item.VehicleTypeId && x.Active == true);


        if (this.context.CountryCode == "IN")
        {
            mapperResult.CO2Emission = fuel?.CO2Amount ?? 0;
            return this.AddItem(mapperResult);

        }

        var brand = new BrandModel(this.config, this.mapper, this.iPrincipal, this.context).GetNameOrAddItem(item);
        item.BrandId = brand.Id;

        var brandSeries = new BrandSeriesModel(this.config, this.mapper, this.iPrincipal, this.context).GetNameOrAddItem(item);
        item.BrandSeriesId = brandSeries.Id;

        var brandVariant = new BrandVariantModel(this.config, this.mapper, this.iPrincipal, this.context).GetNameOrAddItem(item);
        mapperResult.BrandVariantId = brandVariant.Id;

        var fuelType = new FuelTypeModel(this.config, this.mapper, this.iPrincipal, this.context).GetNameOrAddItem(item);
        mapperResult.FuelTypeId = fuelType.Id;

        var result = this.AddItem(mapperResult);

        return result;
    }

    public long Put(ViewEntities.UserVehicle item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserVehicle, DBO.UserVehicle>(item);
        var fuel = new EmissionCategoryModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.FuelTypeId == item.FuelTypeId && x.VehicleTypeId == item.VehicleTypeId && x.Active == true);

        if (this.context.CountryCode == "IN")
        {
            mapperResult.CO2Emission = fuel?.CO2Amount ?? 0;
        }

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.UserVehicle item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserVehicle, DBO.UserVehicle>(item);
        var fuel = new EmissionCategoryModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.FuelTypeId == item.FuelTypeId && x.VehicleTypeId == item.VehicleTypeId && x.Active == true);

        mapperResult.CO2Emission = fuel?.CO2Amount ?? 0;

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.UserVehicle item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserVehicle, DBO.UserVehicle>(item);
        var fuel = new EmissionCategoryModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.FuelTypeId == item.FuelTypeId && x.VehicleTypeId == item.VehicleTypeId && x.Active == true);

        mapperResult.CO2Emission = fuel?.CO2Amount ?? 0;

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
}