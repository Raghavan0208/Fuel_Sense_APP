using Microsoft.AspNetCore.Http;
using StarZero.ViewEntities;

namespace StarZero.Contracts;

public interface IRegistrationModel : IEntityModel<ViewEntities.Registration>
{
    /// <summary>
    /// Getting UserPlan Id and to Cancel
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    long CancelSubscription(long id);

    /// <summary>
    /// Get valid UserName
    /// </summary>
    /// <param name="userName"></param>
    /// <returns></returns>
    string GetValidateUserName(string userName);

    /// <summary>
    /// Check already mobileNo is exit or not.
    /// </summary>
    /// <param name="mobileNo"></param>
    /// <returns></returns>
    string GetValidateByMobileNo(long mobileNo);


    /// <summary>
    /// Getting UserPlan Id and to Cancel
    /// </summary>
    /// <param name="id"> id. </param>
    /// <returns> User Plan.</returns>
    UserPlan GetCurrentPlanByLoginId(long id);

    /// <summary>
    /// Get ProfileImage
    /// </summary>
    /// <param name="loginid"></param>
    /// <returns></returns>
    Task<(byte[] fileContent, string fileName)> GetProfileImage(long loginid);

    /// <summary>
    /// Get ProfileImage as base64 decodes
    /// </summary>
    /// <param name="loginid"></param>
    /// <returns></returns>
    Task<string> GetBase64ProfileImages(long loginid);

    /// <summary>
    /// Saving profile image on local and table
    /// </summary>
    /// <param name="loginid"></param>
    /// <param name="uploadImage"></param>
    /// <returns></returns>
    long UploadProfileImages(long loginid, IFormFileCollection uploadImage);
}
