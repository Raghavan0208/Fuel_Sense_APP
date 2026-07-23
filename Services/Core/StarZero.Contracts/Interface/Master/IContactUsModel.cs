using StarZero.ViewEntities;

namespace StarZero.Contracts.Interface.Master;

public interface IContactUsModel : IEntityModel<ViewEntities.ContactUs>
{
    /// <summary>
    /// To save the Contact details
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    long Post(ContactUs item);
}
