using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using Invent.Helper;
using iText.Commons.Actions.Contexts;
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
public class UserPlanModel : BaseModel<DBO.UserPlan>, IUserPlanModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public UserPlanModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
    }

    public ViewEntities.UserPlan Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserPlan, ViewEntities.UserPlan>(result);

            return mapperResult;
        }

        return default;
    }

    public ViewEntities.UserPlan GetPlanByVehicle(long id)
    {
        var result = this.FindItem(item => item.UserVehicleId == id && item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserPlan, ViewEntities.UserPlan>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.UserPlan> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.UserPlan>, IEnumerable<ViewEntities.UserPlan>>(results);

        return mapperResults;
    }

    public long Post(ViewEntities.UserPlan item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserPlan, DBO.UserPlan>(item);
        var plan = new PlansModel(this.config, this.mapper, this.iPrincipal, this.context).FindItemById(item.PlanId);
        mapperResult.MaximumEmission = plan.CO2limit;
        mapperResult.TreeLimit = plan.TreeCount;
        mapperResult.PlanAmount = plan.Amount;
        mapperResult.StartingReading = mapperResult.IsNewVehicle ? 0 : mapperResult.StartingReading;
        mapperResult.StatusId = (long)STATUS_ENUM.PENDING;

        var result = this.AddItem(mapperResult);
        return result;
    }

    public long Put(ViewEntities.UserPlan item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserPlan, DBO.UserPlan>(item);
        var plan = new PlansModel(this.config, this.mapper, this.iPrincipal, this.context).FindItemById(item.PlanId);
        mapperResult.MaximumEmission = plan.CO2limit;
        mapperResult.TreeLimit = plan.TreeCount;
        mapperResult.PlanAmount = plan.Amount;
        mapperResult.StartingReading = mapperResult.IsNewVehicle ? 0 : mapperResult.StartingReading;
        mapperResult.StatusId = mapperResult.StatusId > 0 ? mapperResult.StatusId : (long)STATUS_ENUM.PENDING;

        this.UpdateItem(mapperResult);
        return mapperResult.Id;
    }

    public long Post(ViewEntities.UserPlan item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserPlan, DBO.UserPlan>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.UserPlan item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserPlan, DBO.UserPlan>(item);

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

    public (decimal, decimal) GetCo2EmissionByPlan(long userPlanId)
    {
        var plan = this.FindItem(x => x.Id == userPlanId);

        var vehicle = new UserVehicleModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.Id == plan.UserVehicleId);

        return (vehicle?.CO2Emission ?? 0, plan?.StartingReading ?? 0);
    }

    public void UpdateEmission(long userPlanId, decimal emission)
    {
        var plan = this.FindItem(x => x.Id == userPlanId);
        plan.CurrentEmission = emission;
        this.UpdateItem(plan);
    }

    public ViewEntities.UserPlan GetCurrentPlanByLoginId(long id)
    {
        var result = this.ExecViewResult<ViewEntities.UserPlan>(StarZeroConstants.DataBase.VW_UserPlan, x => x.LoginId == id);

        return result?.FirstOrDefault();
    }
}