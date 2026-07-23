using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
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
public class UserRoleModel : BaseModel<DBO.UserRole>, IUserRoleModel
    {
        private readonly IOptionsSnapshot<AppConfiguration> config;
        private readonly IPrincipal iPrincipal;
        private readonly IMapper mapper;
        private readonly CountryContext context;

    public UserRoleModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
        {
            this.config = iConfig;
            this.mapper = mapper;
            this.iPrincipal = iPrincipal;
            this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
            this.context = iContext;
            this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
    }

        public ViewEntities.UserRole Get(long id)
        {
            var result = this.FindItem(item => item.Id == id);

            if (result is not null)
            {
                var mapperResult = this.mapper.Map<DBO.UserRole, ViewEntities.UserRole>(result);

                return mapperResult;
            }

            return default;
        }

        public IEnumerable<ViewEntities.UserRole> GetList()
        {
            var results = this.FindItems(item => item.Active == true);
            var mapperResults = this.mapper.Map<IEnumerable<DBO.UserRole>, IEnumerable<ViewEntities.UserRole>>(results);

            return mapperResults;
        }

        public long Post(ViewEntities.UserRole item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.UserRole, DBO.UserRole>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ViewEntities.UserRole item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.UserRole, DBO.UserRole>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        public long Post(ViewEntities.UserRole item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.UserRole, DBO.UserRole>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ViewEntities.UserRole item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.UserRole, DBO.UserRole>(item);

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