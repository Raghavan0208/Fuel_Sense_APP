using StarZero.ViewEntities;

namespace StarZero.Contracts;

public interface IPlansModel : IEntityModel<ViewEntities.Plans>
{
    /// <summary>
    /// Getting vehicletypeid from Plans
    /// </summary>
    /// <param name="vehicletypeid"></param>
    /// <returns></returns>
    Plans GetVehicleTypeId(int vehicletypeid);
}
