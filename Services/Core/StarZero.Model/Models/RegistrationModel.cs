using AutoMapper;
using DataTables.AspNet.Core;
using Invent.DAL;
using Invent.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using StarZero.Contracts;
using StarZero.Helper;
using StarZero.Model.DALMappers;
using StarZero.UploadHelper;
using System.Security.Principal;
using Invent.Helper.Extensions;
using static StarZero.Helper.StarZeroConstants;
using iText.Commons.Actions.Contexts;

namespace StarZero.Model;
public class RegistrationModel : BaseModel<ViewEntities.Registration>, IRegistrationModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly LoginModel loginModel;
    private readonly string filePath;
    private readonly CountryContext context;

    public RegistrationModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
        this.loginModel = new LoginModel(this.config, this.mapper, this.iPrincipal, this.context);
        this.filePath = "ProfileImage";
    }

    public ViewEntities.Registration Get(long id)
    {
        var param = new { paramloginid = id };
        var results = this.ExecStoredProcedureQueryMultiple<ViewEntities.Registration, RegistrationDALMapper>(StarZeroConstants.DataBase.SP_PersonDetails, param);

        return results;
    }
    public IEnumerable<ViewEntities.Registration> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<ViewEntities.Registration>>(results);

        return mapperResults;
    }

    public long Post(ViewEntities.Registration item)
    {
        if (item != null)
        {
            item.LoginId = this.loginModel.AddOrUpdate(item.LoginDetail);
            item.Id = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context).Post(item);
            item.Vehicle.LoginId = item.LoginId;
            item.Vehicle.Id = new UserVehicleModel(this.config, this.mapper, this.iPrincipal, this.context).Post(item.Vehicle);
            item.Plan.UserVehicleId = item.Vehicle.Id;
            new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).Post(item.Plan);
        }

        return item?.LoginId ?? 0;
    }
    public long Put(ViewEntities.Registration item)
    {
        if (item != null)
        {
            // item.LoginId = this.loginModel.AddOrUpdate(item.LoginDetail);
            item.Id = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context).Put(item);
            item.Vehicle.LoginId = item.LoginId;
            item.Vehicle.Id = new UserVehicleModel(this.config, this.mapper, this.iPrincipal, this.context).Put(item.Vehicle);
            item.Plan.UserVehicleId = item.Vehicle.Id;
            new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).Put(item.Plan);
        }

        return item?.LoginId ?? 0;
    }

    public long Post(ViewEntities.Registration item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Registration>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.Registration item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Registration>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var Registration = this.FindItemById(id);

        if (Registration is not null)
        {
            Registration.Active = false;
            this.UpdateItem(Registration);

            return true;
        }

        return false;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public long CancelSubscription(long id)
    {
        var login = this.loginModel.FindItemById(id);
        if (login != null)
        {          
            var personalDetailModel = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context);
            var uservehicleModel = new UserVehicleModel(this.config, this.mapper, this.iPrincipal, this.context);
            var userPlanModel = new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context);

            var userVehicle = uservehicleModel.FindItem(x => x.LoginId == id && x.Active == true);
            userVehicle.Active = false;
            uservehicleModel.UpdateItem(userVehicle);

            var plan = userPlanModel.FindItem(x => x.UserVehicleId == userVehicle.Id && x.Active == true);
            plan.StatusId = (long)STATUS_ENUM.CANCELLED;
            plan.Active = false;
            userPlanModel.UpdateItem(plan);           

            var personalDetail = personalDetailModel.FindItem(x => x.LoginId == id && x.Active == true);
            personalDetail.Active = false;
            personalDetailModel.UpdateItem(personalDetail);

            login.Active = false;
            this.loginModel.UpdateItem(login);
        }

        return id;
    }

    public string GetValidateUserName(string userName)
    {
        var result = string.Empty;
        var loginDetail = new LoginModel(this.config,this.mapper, this.iPrincipal, this.context);
        var exitUser = loginDetail.FindItem(x => x.UserName == userName && x.Active == true);
        
        if(exitUser != null)
            return result = userName;

        return result;
    }

    public string GetValidateByMobileNo(long mobileNo)
    {
        var result = string.Empty;
        var loginDetail = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context);
        var exitUser = loginDetail.FindItem(x => x.MobileNumber == mobileNo && x.Active == true);

        if (exitUser != null)
            return result = mobileNo.ToString();

        return result;
    }


    public ViewEntities.UserPlan GetCurrentPlanByLoginId(long id)
    {
        var result = new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).GetCurrentPlanByLoginId(id);

        return result;
    }

    public async Task<(byte[] fileContent, string fileName)> GetProfileImage(long loginid)
    {
        var personalDetailModel = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context);
        var result = personalDetailModel.FindItem(item => item.LoginId == loginid && item.Active == true);
        if (result is not null)
        {
            string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                            this.filePath, result?.Id.ToString(), result.ProfileImage);

            byte[] fileContent = await File.ReadAllBytesAsync(filePath);

            return (fileContent: fileContent, fileName: result.ProfileImage);
        }

        return default;
    }

    public async Task<string> GetBase64ProfileImages(long loginid)
    {
        string base64String = null;

        var personalDetailModel = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context);
        var result = personalDetailModel.FindItem(item => item.LoginId == loginid && item.Active == true);
        if (result is not null)
        {
            string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath, this.filePath, result?.Id.ToString(), result.ProfileImage);
            base64String = FileExtensions.GetBase64String(filePath);
        }

        return base64String;
    } 

    public long UploadProfileImages(long loginid, IFormFileCollection uploadImage)
    {
        var personalDetailModel = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context);
        var personalDetail = personalDetailModel.FindItem(x => x.LoginId == loginid && x.Active == true);
        
        personalDetail.ProfileImage = uploadImage[0].FileName;
        personalDetailModel.UpdateItem(personalDetail);
        
        this.SaveAttachment(uploadImage, personalDetail.Id);

        return loginid;
    }
     
    public async void SaveAttachment(IFormFileCollection? uploadImage, long id)
    {
        if (uploadImage?.Count() > 0 && (PermittedFileTypes.FileType.Contains(uploadImage[0].ContentType)))
        {
            if (this.config?.Value.AWSConfiguration?.EnableS3 == true)
            {
                string filePath = string.Concat(this.filePath, "/", id);
                IEnumerable<string>? filePathList = await new S3ClientHelperService(this.config).SaveAttachmentsToS3(uploadImage, filePath);
            }
            else
            {
                string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath, $"{this.filePath}", $"{id}");
                IEnumerable<string>? filePathList = await uploadImage.SaveAttachments(filePath);
            }
        }
    }

}