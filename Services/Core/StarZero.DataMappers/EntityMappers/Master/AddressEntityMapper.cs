using AutoMapper;

namespace StarZero.DataMappers;

public class AddressEntityMapper : ITypeConverter<DBO.Address, ViewEntities.Address>
{
    public ViewEntities.Address Convert(DBO.Address source, ViewEntities.Address destination, ResolutionContext context)
    {
        var item = new ViewEntities.Address();

        item.Id = source.Id;
        item.CountryCode = source.CountryCode;
        item.Address1 = source.Address1;
        item.Address2 = source.Address2;
        item.CityName = source.CityName;
        item.StateName = source.StateName;
        item.Country = source.Country;
        item.PinCode = source.PinCode;
        item.ContactNumber1 = source.ContactNumber1;
        item.ContactNumber2 = source.ContactNumber2;
        item.RowOrder = source.RowOrder;
        item.Active = source.Active;
        item.Created = source.Created;
        item.CreatedBy = source.CreatedBy;
        item.Modified = source.Modified;
        item.ModifiedBy = source.ModifiedBy;
        return item;
    }
}
