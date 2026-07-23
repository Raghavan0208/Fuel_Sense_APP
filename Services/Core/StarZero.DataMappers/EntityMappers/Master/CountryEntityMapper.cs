using AutoMapper;

namespace StarZero.DataMappers;

public class CountryEntityMapper : ITypeConverter<DBO.Country, ViewEntities.Country>
{
    public ViewEntities.Country Convert(DBO.Country source, ViewEntities.Country destinationCountry, ResolutionContext context)
    {
        var item = new ViewEntities.Country();

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
