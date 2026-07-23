using AutoMapper;
using Invent.DAL;
using iText.Commons.Actions.Contexts;
using Microsoft.Extensions.Options;
using MySqlX.XDevAPI.Common;
using StarZero.Contracts;
using StarZero.Helper;
using StarZero.Helper.Extensions;
using StarZero.ViewEntities;
using System.Security.Cryptography;
using System.Security.Principal;

namespace StarZero.Model;
public class LoginModel : BaseModel<DBO.Login>, ILoginModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal iPrincipal;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public LoginModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper mapper, IPrincipal iPrincipal = null, CountryContext iContext = null) : base()
    {
        this.config = iConfig;
        this.mapper = mapper;
        this.iPrincipal = iPrincipal;
        this.DatabaseType = Invent.Helper.EntityBase.DBType.MySQL;
        this.context = iContext;
        this.ConnectionString = GetConnectionString(context, iConfig.Value.DatabaseConfiguration);
    }

    public ViewEntities.Login Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Login, ViewEntities.Login>(result);

            return mapperResult;
        }

        return default;
    }

    public long AddOrUpdate(ViewEntities.Login item)
    {
        if (item != null)
        {
            item.UserRoleId = item.UserRoleId > 0 ? item.UserRoleId : (long)ROLES_ENUM.PUBLIC;

            var mapperResult = this.mapper.Map<ViewEntities.Login, DBO.Login>(item);

            var cryptoCredentials = this.CreateEncryptionPasswords(item.PassWord);
            mapperResult.PassWord = Convert.ToString(cryptoCredentials.Item3);
            mapperResult.Salt = Convert.ToString(cryptoCredentials.Item1);
            mapperResult.IVKey = Convert.ToString(cryptoCredentials.Item2);

            if (mapperResult.Id > 0)
            {
                this.UpdateItem(mapperResult);
            }
            else
            {
                mapperResult.Id = this.AddItem(mapperResult);
            }

            return mapperResult.Id;
        }

        return default;
    }

    public IEnumerable<ViewEntities.Login> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.Login>, IEnumerable<ViewEntities.Login>>(results);

        return mapperResults;
    }

    public async Task<Login> AuthenticateWithEmail(string userName, string passWord)
    {
        var loginData = this.FindItem(item => item.UserName.Trim() == userName.Trim() && item.Active == true);
        if (loginData is not null)
        {
            var encryptedPassword = this.EncryptPassword(passWord, loginData.Salt, loginData.IVKey);
            if (loginData.PassWord.Equals(encryptedPassword))

            {
                Login result = this.mapper.Map<DBO.Login, ViewEntities.Login>(loginData);
                return await Task.FromResult(result);
            }
        }

        return default;
    }

    public string DecryptPassword(string encrytedPassword)
    {
        var result = this.FindItem(item => item.PassWord == encrytedPassword);
        if (result is null)
        {
            return default;
        }

        string decrptedPassword = RijndaelSecurityEncryption.DecryptwithRijndael(result.PassWord, result.Salt, result.IVKey);

        return decrptedPassword;
    }

    public async Task<bool> ValidateUserAsync(string email)
    {
        var users = this.ExecViewResult<Login>(StarZeroConstants.DataBase.VW_LoginDetail, item => item.UserName == email);

        if (users?.Count() > 0)
        {
            var result = users?.Where(x => x.UserRoleId == (long)ROLES_ENUM.PUBLIC);
            bool isValid = result?.Count() > 0 ? true : false;

            return await Task.FromResult(isValid);
        }

        return default;
    }

    public Login GetLoginsDetailsbyUserName(string username)
    {
        var result = this.FindItem(item => item.UserName == username && item.Active == true);

        if (result is null)
        {
            return default;
        }

        var mapperResult = this.mapper.Map<DBO.Login, ViewEntities.Login>(result);

        return mapperResult;
    }

    public async Task<Login> ForgetPassword(string email)
    {
        var personalDetailModel = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context);
        var personData = personalDetailModel.FindItem(item => item.Active == true && item.Email == email);
        if (personData != null)
        {
            var loginData = this.FindItem(item => item.Active == true && item.UserName.Trim() == personData.Email.Trim());
            if (loginData is not null)
            {
                Login result = this.mapper.Map<DBO.Login, ViewEntities.Login>(loginData);

                return await Task.FromResult(result);
            }
        }

        return default;
    }

    public async Task<Login> ResetPassword(string username, string updatedPassword)
    {
        if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(updatedPassword))
        {
            var result = this.FindItem(item => item.UserName == username && item.Active == true);
            if (result is not null)
            {
                return await this.UpdateCredential(updatedPassword, result);
            }
        }

        return default;
    }

    public PersonalDetail GetPersonByLoginId(long? loginId)
    {
        var person = new PersonalDetailModel(this.config, this.mapper, this.iPrincipal, this.context).
                                     GetPersonsByLoginId(loginId?? 0);
        if (person is null)
        {
            return default;
        }

        return person;
    } 

    public long GetStatusIdByLoginId(long id)
    {
        var userplan = new UserPlanModel(this.config, this.mapper, this.iPrincipal, this.context).GetCurrentPlanByLoginId(id);

        return userplan?.StatusId ?? 0;
    }

    private string EncryptPassword(string passWord, string salt, string ivKey)
    {
        if (!string.IsNullOrWhiteSpace(passWord) && !string.IsNullOrWhiteSpace(salt) && !string.IsNullOrWhiteSpace(ivKey))
        {
            using (Rijndael myRijndael = Rijndael.Create())
            {
                // Decrypt the bytes to a string.
                string encyPassword = RijndaelSecurityEncryption.EncryptwithRijndael(passWord, salt, ivKey);
                return encyPassword;
            }
        }

        return default;
    }

    private async Task<Login> UpdateCredential(string updatedPassword, DBO.Login result)
    {
        var cryptoCredentials = this.CreateEncryptionPasswords(updatedPassword);
        result.PassWord = Convert.ToString(cryptoCredentials.Item3);
        result.Salt = Convert.ToString(cryptoCredentials.Item1);
        result.IVKey = Convert.ToString(cryptoCredentials.Item2);
        this.UpdateItem(result);

        return await Task.FromResult(this.mapper.Map<DBO.Login, ViewEntities.Login>(result));
    }

    private (string, string, string) CreateEncryptionPasswords(string passWord)
    {
        if (!string.IsNullOrEmpty(passWord))
        {
            string salt = string.Empty;
            string ivKey = string.Empty;
            string encryptPassword = string.Empty;

            using (Rijndael myRijndael = Rijndael.Create())
            {
                salt = RijndaelSecurityEncryption.ByteArrayToHexaString(myRijndael.Key);
                ivKey = RijndaelSecurityEncryption.ByteArrayToHexaString(myRijndael.IV);
                encryptPassword = RijndaelSecurityEncryption.EncryptwithRijndael(passWord, salt, ivKey);
            }

            return (salt, ivKey, encryptPassword);
        }

        return default;
    }
}
