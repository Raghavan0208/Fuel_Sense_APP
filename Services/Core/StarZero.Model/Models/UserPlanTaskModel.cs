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
public class UserPlanTaskModel : BaseModel<DBO.UserPlanTask>, IUserPlanTaskModel
    {
        private readonly IOptionsSnapshot<AppConfiguration> config;
        private readonly IPrincipal iPrincipal;
        private readonly IMapper mapper;
    private readonly CountryContext context;

    public UserPlanTaskModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
        {
            this.config = iConfig;
            this.mapper = mapper;
            this.iPrincipal = iPrincipal;
            this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
            this.context = iContext;
            this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
    }

        public ViewEntities.UserPlanTask Get(long id)
        {
            var result = this.FindItem(item => item.Id == id);

            if (result is not null)
            {
                var mapperResult = this.mapper.Map<DBO.UserPlanTask, ViewEntities.UserPlanTask>(result);

                return mapperResult;
            }

            return default;
        }

        public IEnumerable<ViewEntities.UserPlanTask> GetList()
        {
            var results = this.FindItems(item => item.Active == true);
            var mapperResults = this.mapper.Map<IEnumerable<DBO.UserPlanTask>, IEnumerable<ViewEntities.UserPlanTask>>(results);

            return mapperResults;
        }

        public long Post(ViewEntities.UserPlanTask item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.UserPlanTask, DBO.UserPlanTask>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ViewEntities.UserPlanTask item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.UserPlanTask, DBO.UserPlanTask>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        public long Post(ViewEntities.UserPlanTask item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.UserPlanTask, DBO.UserPlanTask>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ViewEntities.UserPlanTask item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.UserPlanTask, DBO.UserPlanTask>(item);

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