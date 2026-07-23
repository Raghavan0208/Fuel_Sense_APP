using AutoMapper;

namespace StarZero.DataMappers;

public class FuelTypeEntityMapper : ITypeConverter<DBO.FuelType, ViewEntities.FuelType>
{
    public ViewEntities.FuelType Convert(DBO.FuelType source, ViewEntities.FuelType destination, ResolutionContext context)
    {
        var item = new ViewEntities.FuelType();

        item.Id = source.Id;
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
