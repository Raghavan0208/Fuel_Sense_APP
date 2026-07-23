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
public class AddressModel : BaseModel<DBO.Address>, IAddressModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public AddressModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = iConfig.Value.DatabaseConfiguration.CoreDBConnectionString;
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }

    public IEnumerable<ViewEntities.Address> GetList()
    {
        var results = this.FindItems(item => item.Active == true);

        var mapperResult = this.mapper.Map<IEnumerable<DBO.Address>, IEnumerable<ViewEntities.Address>>(results);

        return mapperResult;
    }

    public IEnumerable<ViewEntities.Address> GetListByCountryCode(string countrycode)
    {
        var results = this.FindItems(item => item.Active == true && item.CountryCode.ToLower() == countrycode.ToLower());

        var mapperResult = this.mapper.Map<IEnumerable<DBO.Address>, IEnumerable<ViewEntities.Address>>(results);

        return mapperResult;
    }
    public long Post(ViewEntities.Address item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Address, DBO.Address>(item);

        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Address item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Address, DBO.Address>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.Address item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Address, DBO.Address>(item);

        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Address item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Address, DBO.Address>(item);

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

    public ViewEntities.Address Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Address, ViewEntities.Address>(result);

            return mapperResult;
        }

        return default;
    }
}
