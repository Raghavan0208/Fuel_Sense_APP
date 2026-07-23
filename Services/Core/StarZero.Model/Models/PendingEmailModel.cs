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
public class PendingEmailModel : BaseModel<DBO.PendingEmail>, IPendingEmailModel
    {
        private readonly IOptionsSnapshot<AppConfiguration> config;
        private readonly IPrincipal iPrincipal;
        private readonly IMapper mapper;
    private readonly CountryContext context;

    public PendingEmailModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
        {
            this.config = iConfig;
            this.mapper = mapper;
            this.iPrincipal = iPrincipal;
            this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
            this.context = iContext;
            this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
    }

        public ViewEntities.PendingEmail Get(long id)
        {
            var result = this.FindItem(item => item.Id == id);

            if (result is not null)
            {
                var mapperResult = this.mapper.Map<DBO.PendingEmail, ViewEntities.PendingEmail>(result);

                return mapperResult;
            }

            return default;
        }

        public IEnumerable<ViewEntities.PendingEmail> GetList()
        {
            var results = this.FindItems(item => item.Active == true);
            var mapperResults = this.mapper.Map<IEnumerable<DBO.PendingEmail>, IEnumerable<ViewEntities.PendingEmail>>(results);

            return mapperResults;
        }

        public long Post(ViewEntities.PendingEmail item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.PendingEmail, DBO.PendingEmail>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ViewEntities.PendingEmail item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.PendingEmail, DBO.PendingEmail>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        public long Post(ViewEntities.PendingEmail item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.PendingEmail, DBO.PendingEmail>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ViewEntities.PendingEmail item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.PendingEmail, DBO.PendingEmail>(item);

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