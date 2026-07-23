using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Helper;
using StarZero.ViewEntities;
using System.Security.Principal;
using Invent.Helper.Extensions;
using StarZero.UploadHelper;
using StarZero.Helper.Extensions;
using static StarZero.Helper.StarZeroConstants;
using iText.Commons.Actions.Contexts;

namespace StarZero.Model;
public class PlanReadingModel : BaseModel<DBO.PlanReading>, IPlanReadingModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly string filePath;
    private readonly CountryContext context;

    public PlanReadingModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
        this.filePath = "ReadingImage";
    }

    public ViewEntities.PlanReading Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PlanReading, ViewEntities.PlanReading>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.PlanReading> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.PlanReading>, IEnumerable<ViewEntities.PlanReading>>(results);

        return mapperResults;
    }

    public async void SaveAttachment(IFormFileCollection? files, long id)
    {
        if (files?.Count() > 0 && (PermittedFileTypes.FileType.Contains(files[0]?.ContentType)))
        {
            if (this.config?.Value.AWSConfiguration?.EnableS3 == true)
            {
                string filePath = string.Concat(this.filePath, "/", id);
                IEnumerable<string>? filePathList = await new S3ClientHelperService(this.config).SaveAttachmentsToS3(files, filePath);
            }
            else
            {
                string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath, $"{this.filePath}", $"{id}");
                IEnumerable<string>? filePathList = await files?.SaveAttachments(filePath);
            }
        }
    }

    public async Task<(byte[] fileContent, string fileName)> GetPlanReadingImages(long id)
    {
        DBO.PlanReading result = this.FindItem(item => item.Id == id && item.Active == true);
        if (result is not null)
        {
            string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                            result?.ReadingImagePath, result?.Id.ToString(), result?.ImageName);

            byte[] fileContent = await File.ReadAllBytesAsync(filePath);

            return (fileContent: fileContent, fileName: result.ImageName);
        }

        return default;
    }

    public async Task<string> GetBase64PlanReadingImages(long id)
    {
        DBO.PlanReading result = this.FindItem(item => item.Id == id && item.Active == true);
        string base64String = null;

        if (result is not null)
        {
            if (this.config?.Value.AWSConfiguration?.EnableS3 == true)
            {
                string filePath = string.Concat(this.filePath, "/", result.Id, "/", result?.ImageName);
                var resultByte = await new S3ClientHelperService(this.config).FileDownloadAsync(filePath);
                base64String = Convert.ToBase64String(resultByte);

                return base64String;
            }
            else
            {
                string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                          result?.ReadingImagePath, result?.Id.ToString(), result?.ImageName);

                base64String = FileExtensions.GetBase64String(filePath);
            }
        }

        return base64String;
    }

    public long Post(ViewEntities.PlanReading item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.PlanReading, DBO.PlanReading>(item);

        var calculatedValue = this.GetCO2Emission(item.UserPlanId, item.Reading, item.Id);

        mapperResult.Distance = calculatedValue.Item1;
        mapperResult.Co2Emission = calculatedValue.Item2;
        mapperResult.RowOrder = calculatedValue.Item4;

        mapperResult.ReadingImagePath = this.filePath;
        mapperResult.ImageName = item.UploadFiles[0].FileName;

        var result = this.AddItem(mapperResult);
        new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).UpdateEmission(item.UserPlanId, calculatedValue.Item3);
        this.SaveAttachment(item.UploadFiles, result);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.PlanReading item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.PlanReading, DBO.PlanReading>(item);
            var calculatedValue = this.GetCO2Emission(item.UserPlanId, item.Reading, item.Id);

            mapperResult.Distance = calculatedValue.Item1;
            mapperResult.Co2Emission = calculatedValue.Item2;
            mapperResult.RowOrder = calculatedValue.Item4;

            mapperResult.ReadingImagePath = this.filePath;
            mapperResult.ImageName = item.UploadFiles[0].FileName;

            this.UpdateItem(mapperResult);

            new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).UpdateEmission(item.UserPlanId, calculatedValue.Item3);
            this.SaveAttachment(item.UploadFiles, mapperResult.Id);

            return mapperResult.Id;
        }

        return default;
    }


    public long PostAppData(ViewEntities.PlanReading item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.PlanReading, DBO.PlanReading>(item);

        var calculatedValue = this.GetCO2EmissionForApp(item.UserPlanId, item.Reading, item.Id);
        mapperResult.Distance = calculatedValue.Item1;
        mapperResult.Co2Emission = (item.isNotEmmitted == true) ? 0: calculatedValue.Item2;
        mapperResult.RowOrder = calculatedValue.Item4;

        var result = this.AddItem(mapperResult);
        new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).UpdateEmission(item.UserPlanId, calculatedValue.Item3);

        return mapperResult.Id;
    }


    public long Post(ViewEntities.PlanReading item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.PlanReading, DBO.PlanReading>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.PlanReading item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.PlanReading, DBO.PlanReading>(item);

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

    public IEnumerable<ViewEntities.PlanReading> GetPlanReadingList(long userplanid)
    {
        var result = this.FindItems(item => item.UserPlanId == userplanid && item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            List<ViewEntities.PlanReading> mapperResult = this.mapper.Map<IEnumerable<DBO.PlanReading>, IEnumerable<ViewEntities.PlanReading>>(result)?.ToList();

            for (int i = 0; i < mapperResult.Count(); i++)
            {
                mapperResult[i].CumulativeCo2Emission = i > 0 ? mapperResult[i].Co2Emission + mapperResult[i - 1].CumulativeCo2Emission : mapperResult[i].Co2Emission;
            }

            return mapperResult;
        }

        return default;
    }

    public ViewEntities.Dashboard GetDashboard(long loginId)
    {
        var param = new
        {
            LoginId = loginId
        };

        var results = this.ExecStoredProcedure<ViewEntities.Dashboard>(StarZeroConstants.DataBase.SP_GetPlanDashboard, param)?.FirstOrDefault();

        return results;
    }

    private (decimal, decimal, decimal, long) GetCO2Emission(long userPlanId, decimal reading, long id)
    {
        decimal distance = 0;
        decimal currentEmission = 0;
        decimal totalEmission = 0;
        long rowOrder = 0;
        var miles = 1.6;


        var plan = new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).GetCo2EmissionByPlan(userPlanId);

        var co2Unit = plan.Item1;
        var startDistance = plan.Item2;

        var previousReadings = this.FindItems(x => x.UserPlanId == userPlanId && x.Active == true)?.Where(x => x.Id != id)?.OrderByDescending(x => x.Id);

        if (previousReadings?.Count() > 0)
        {
            var lastReading = previousReadings?.FirstOrDefault();
            distance = reading > 0 ? reading - lastReading.Reading : 0;
            if(this.context.CountryCode == "UK")
            {
                currentEmission = (distance * (decimal)miles) * co2Unit;
            }
            else
            {
                currentEmission = distance * co2Unit;
            }
            totalEmission = previousReadings?.Sum(x => x.Co2Emission) ?? 0;
            rowOrder = (lastReading?.RowOrder ?? 0) + 100;
        }
        else
        {
            distance = reading > 0 ? reading - startDistance : 0;
            if (this.context.CountryCode == "UK")
            {
                currentEmission = (distance * (decimal)miles) * co2Unit;
            }
            else
            {
                currentEmission = distance * co2Unit;
            };
            totalEmission = currentEmission;
            rowOrder = 100;
        }

        return (distance, currentEmission, totalEmission, rowOrder);
    }

    private (decimal, decimal, decimal, long) GetCO2EmissionForApp(long userPlanId, decimal distance, long id)
    {
        decimal currentEmission = 0;
        decimal totalEmission = 0;
        long rowOrder = 0;

        var plan = new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).GetCo2EmissionByPlan(userPlanId);

        var co2Unit = plan.Item1;
        var startDistance = plan.Item2;

        var previousReadings = this.FindItems(x => x.UserPlanId == userPlanId && x.Active == true)?.Where(x => x.Id != id)?.OrderByDescending(x => x.Id);

        if (previousReadings?.Count() > 0)
        {
            var lastReading = previousReadings?.FirstOrDefault();
            currentEmission = distance * co2Unit;
            totalEmission = previousReadings?.Sum(x => x.Co2Emission) ?? 0;
            rowOrder = (lastReading?.RowOrder ?? 0) + 100;
        }
        else
        {
            currentEmission = distance * co2Unit;
            totalEmission = currentEmission;
            rowOrder = 100;
        }

        return (distance, currentEmission, totalEmission, rowOrder);
    }
}