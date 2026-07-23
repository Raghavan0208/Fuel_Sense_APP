using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using iText.Commons.Actions.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Contracts.Interface.Master;
using StarZero.Helper;
using StarZero.ViewEntities;
using System.Security.Principal;

namespace StarZero.Model.Models.Master;

public class ContactUsModel : BaseModel<DBO.ContactUs>, IContactUsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public ContactUsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
    }

    public ContactUs Get(long id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ContactUs> GetList()
    {
        throw new NotImplementedException();
    }

    public long Post(ViewEntities.ContactUs item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ContactUs, DBO.ContactUs>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }
     

    public long Post(ContactUs item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(ContactUs item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(ContactUs item)
    {
        throw new NotImplementedException();
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public bool Remove(long id)
    {
        throw new NotImplementedException();
    }
}
