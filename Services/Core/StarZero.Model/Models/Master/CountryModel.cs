using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using Invent.Helper.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Helper;
using StarZero.ViewEntities;
using System.Security.Principal;

namespace StarZero.Model;

public class CountryModel : BaseModel<DBO.Country>, ICountryModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public CountryModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = iConfig.Value.DatabaseConfiguration.CoreDBConnectionString;
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }
    public ViewEntities.Country Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Country, ViewEntities.Country>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<Country> GetListByCountryCode(string countrycode)
    {
        var results = this.FindItems(item => item.Active == true && item.CountryCode.ToLower() == countrycode.ToLower());
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Country>, IEnumerable<ViewEntities.Country>>(results);
        return mapperResult;
    }

    public long Post(ViewEntities.Country item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Country, DBO.Country>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Country item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Country, DBO.Country>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.Country item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Country, DBO.Country>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Country item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Country, DBO.Country>(item);
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

    public IEnumerable<Country> GetList()
    {
        var results = this.FindItems(item => item.Active == true && item.CountryCode != "");
        var mapperResults = this.mapper.Map<IEnumerable<ViewEntities.Country>>(results);
        return mapperResults;
    }
}
