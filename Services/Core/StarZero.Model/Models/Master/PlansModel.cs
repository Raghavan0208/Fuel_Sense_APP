using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using iText.Commons.Actions.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Helper;
using StarZero.ViewEntities;
using System.Security.Principal;

namespace StarZero.Model;

public class PlansModel : BaseModel<DBO.Plans>, IPlansModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public PlansModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }

    public long Post(ViewEntities.Plans item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Plans, DBO.Plans>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Plans item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Plans, DBO.Plans>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.Plans item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Plans, DBO.Plans>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Plans item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Plans, DBO.Plans>(item);
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

    public ViewEntities.Plans Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Plans, ViewEntities.Plans>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.Plans> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Plans>, IEnumerable<ViewEntities.Plans>>(results);
        return mapperResult;
    }

    public ViewEntities.Plans GetVehicleTypeId(int vehicletypeid)
    {
        var result = this.FindItem(item => item.VehicleTypeId == vehicletypeid);

        if(result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Plans, ViewEntities.Plans>(result);
            return mapperResult;
        }
        return default;
    }
}
