using Microsoft.AspNetCore.Http;
using StarZero.ViewEntities;

namespace StarZero.Contracts;

public interface IPlanReadingModel : IEntityModel<ViewEntities.PlanReading>
{    
    /// <summary>
    /// Getting Imagename from Plan Reading
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<(byte[] fileContent, string fileName)> GetPlanReadingImages(long id);

    /// <summary>
    /// Getting data from PlanReading
    /// </summary>
    /// <param name="userplanid"></param>
    /// <returns></returns>
    IEnumerable<ViewEntities.PlanReading> GetPlanReadingList(long userplanid);

    /// <summary>
    /// Provider Dashboard Count.
    /// </summary>
    /// <param name="loginId">provider dashboard entity.</param>
    /// <returns>ProviderDashboardMaster count.</returns>
    Dashboard GetDashboard(long loginId);

    /// Get Base64 Images from PlanReading
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<string> GetBase64PlanReadingImages(long id);

    /// <summary>
    /// Creates the Entity Information with IFormFileCollection.
    /// </summary>
    /// <param name="item">Represents an entity to create entity Information.</param>
    /// <returns>Entity Item Id.</returns>
    long PostAppData(PlanReading item);
}
