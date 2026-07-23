
using StarZero.ViewEntities;

namespace StarZero.Contracts;

public interface ILoginModel : IBaseModel<ViewEntities.Login>
{
    /// <summary>
    /// Chech whether Given credentials are valid or not.
    /// </summary>
    /// <param name="phoneNumber">request.</param>
    /// <param name="passWord">request</param>
    /// <returns> boolean result.</returns>
    Task<ViewEntities.Login> AuthenticateWithEmail(string phoneNumber, string passWord);

    /// <summary>
    /// Get decryptedPassword.
    /// </summary>
    /// <param name="encrytedPassword">request.</param>
    /// <returns> EncryptedPassword.</returns>
    public string DecryptPassword(string encrytedPassword);

    /// <summary>
    /// Get Update Password.
    /// </summary>
    /// <param name="username">request.</param>
    /// <param name="updatedPassword">request.</param>
    /// <returns> EncryptedPassword.</returns>
    Task<Login> ResetPassword(string username, string updatedPassword);

    /// <summary>
    /// Validate Admin User.
    /// </summary>
    /// <param name="phoneNumber">request.</param>
    /// <returns> result true or False.</returns>
    public Task<bool> ValidateUserAsync(string phoneNumber);

    /// <summary>
    /// Get person.
    /// </summary>
    /// <param name="loginId">request</param>
    /// <returns> person result.</returns>
    ViewEntities.PersonalDetail GetPersonByLoginId(long? loginId);

    /// <summary>
    /// Get logins by userName.
    /// </summary>
    /// <param name="userName">request.</param>
    /// <returns> Get logins.</returns>
    Login GetLoginsDetailsbyUserName(string userName);

    /// <summary>
    /// Get OTP process.
    /// </summary>
    /// <param name="phoneNumber">request</param>
    /// <returns> boolean result creation</returns>
    Task<ViewEntities.Login> ForgetPassword(string email);

    /// <summary>
    /// Get StatusId from payment details By LoginId
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    long GetStatusIdByLoginId(long id);
}