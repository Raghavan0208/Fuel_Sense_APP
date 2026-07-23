using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using Invent.Helper;
using iText.Commons.Actions.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Helper;
using StarZero.ViewEntities;
using System.Security.Principal;

namespace StarZero.Model;
public class PaymentDetailsModel : BaseModel<DBO.PaymentDetails>, IPaymentDetailsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public PaymentDetailsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
    }
    
    public PaymentDetails Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PaymentDetails, ViewEntities.PaymentDetails>(result);
            mapperResult.PlanDetail = new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).GetCurrentPlanByLoginId(mapperResult.LoginId);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<PaymentDetails> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.PaymentDetails>, IEnumerable<ViewEntities.PaymentDetails>>(results);

        return mapperResults;
    }


    public long Post(PaymentDetails item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.PaymentDetails, DBO.PaymentDetails>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.PaymentDetails item)
    {
        var paymentResult = this.mapper.Map<ViewEntities.PaymentDetails, DBO.PaymentDetails>(item);

        var userPlanModel = new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context);
        var userPlanResult = userPlanModel.FindItem(x => x.Id == item.UserPlanId && x.Active == true);
        
        if(item.Status?.ToLower() == "success") {
            userPlanResult.StatusId = (long)STATUS_ENUM.PAYMENTCOMPLETED;
            userPlanModel.UpdateItem(userPlanResult);           
        }
        else if (item.Status?.ToLower() == "failure") {
            userPlanResult.StatusId = (long)STATUS_ENUM.PAYMENTFAILED;
            userPlanModel.UpdateItem(userPlanResult);
        }
      
        paymentResult.StatusId = userPlanResult.StatusId;
        var result = this.AddItem(paymentResult);

        return paymentResult.Id;
    }

    public long Put(PaymentDetails item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.PaymentDetails, DBO.PaymentDetails>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(PaymentDetails item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.PaymentDetails, DBO.PaymentDetails>(item);
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
