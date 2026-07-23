using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using iText.Commons.Actions.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Helper;
using System.Security.Principal;

namespace StarZero.Model;

public class EmissionCategoryModel : BaseModel<DBO.EmissionCategory>, IEmissionCategoryModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public EmissionCategoryModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }

    public long Post(ViewEntities.EmissionCategory item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.EmissionCategory, DBO.EmissionCategory>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.EmissionCategory item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.EmissionCategory, DBO.EmissionCategory>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.EmissionCategory item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.EmissionCategory, DBO.EmissionCategory>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.EmissionCategory item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.EmissionCategory, DBO.EmissionCategory>(item);
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

    public ViewEntities.EmissionCategory Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.EmissionCategory, ViewEntities.EmissionCategory>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.EmissionCategory> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.EmissionCategory>, IEnumerable<ViewEntities.EmissionCategory>>(results);
        return mapperResult;
    }
}
