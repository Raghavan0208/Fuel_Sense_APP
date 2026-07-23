using AutoMapper;

namespace StarZero.DataMappers;

public class FuelTypeModelMapper : ITypeConverter<ViewEntities.FuelType, DBO.FuelType>
{
    public DBO.FuelType Convert(ViewEntities.FuelType source, DBO.FuelType destination, ResolutionContext context)
    {
        var item = new DBO.FuelType();

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
