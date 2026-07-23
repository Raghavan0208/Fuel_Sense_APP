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
public class BlogsModel : BaseModel<DBO.Blogs>, IBlogsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public BlogsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = iConfig.Value.DatabaseConfiguration.CoreDBConnectionString;
        this.LoadMasterFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
    }

    public IEnumerable<ViewEntities.Blogs> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Blogs>, IEnumerable<ViewEntities.Blogs>>(results);
        return mapperResult;
    }

    public IEnumerable<ViewEntities.Blogs> GetListByCountryCode(string countrycode)
    {
        var results = this.FindItems(item => item.Active == true && item.CountryCode.ToLower() == countrycode.ToLower());
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Blogs>, IEnumerable<ViewEntities.Blogs>>(results);
        return mapperResult;
    }

    public long Post(ViewEntities.Blogs item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Blogs, DBO.Blogs>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Blogs item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Blogs, DBO.Blogs>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.Blogs item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Blogs, DBO.Blogs>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Blogs item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Blogs, DBO.Blogs>(item);
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

    public ViewEntities.Blogs Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Blogs, ViewEntities.Blogs>(result);

            return mapperResult;
        }

        return default;
    }
}
