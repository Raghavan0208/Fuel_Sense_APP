using AutoMapper;

namespace StarZero.DataMappers;

public class BrandModelMapper : ITypeConverter<ViewEntities.Brand, DBO.Brand>
{
    public DBO.Brand Convert(ViewEntities.Brand source, DBO.Brand destination, ResolutionContext context)
    {
        var item = new DBO.Brand();

        item.Id = source.Id;
        item.VehicleTypeId = source.VehicleTypeId;
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
