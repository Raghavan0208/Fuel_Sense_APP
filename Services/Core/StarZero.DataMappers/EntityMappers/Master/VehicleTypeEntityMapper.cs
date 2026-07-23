using AutoMapper;

namespace StarZero.DataMappers;

public class VehicleTypeEntityMapper : ITypeConverter<DBO.VehicleType, ViewEntities.VehicleType>
{
    public ViewEntities.VehicleType Convert(DBO.VehicleType source, ViewEntities.VehicleType destination, ResolutionContext context)
    {
        var item = new ViewEntities.VehicleType();

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
