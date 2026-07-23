using AutoMapper;

namespace StarZero.DataMappers;

public class CountryModelMapper : ITypeConverter<ViewEntities.Country, DBO.Country>
{
    public DBO.Country Convert(ViewEntities.Country source, DBO.Country destination, ResolutionContext context)
    {
        var item = new DBO.Country();
        
        item.Id = source.Id;
        item.CountryCode = source.CountryCode;
        item.Name = source.Name;
        item.DisplayName = source.DisplayName;
        item.EnumName = source.EnumName;
        item.DisplayInList = source.DisplayInList;
        item.RowOrder = source.RowOrder;
        item.Active = source.Active;
        item.Created = source.Created;
        item.CreatedBy = source.CreatedBy;
        item.Modified = source.Modified;
        item.ModifiedBy = source.ModifiedBy;

        return item;
    }
}
