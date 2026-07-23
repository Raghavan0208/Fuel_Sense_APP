using AutoMapper;

namespace StarZero.DataMappers;

public class VehicleTypeModelMapper : ITypeConverter<ViewEntities.VehicleType, DBO.VehicleType>
{
    public DBO.VehicleType Convert(ViewEntities.VehicleType source, DBO.VehicleType destination, ResolutionContext context)
    {
        var item = new DBO.VehicleType();

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
