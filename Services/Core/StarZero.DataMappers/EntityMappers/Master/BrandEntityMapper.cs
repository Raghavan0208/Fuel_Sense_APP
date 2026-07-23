using AutoMapper;

namespace StarZero.DataMappers;

public class BrandEntityMapper : ITypeConverter<DBO.Brand, ViewEntities.Brand>
{
    public ViewEntities.Brand Convert(DBO.Brand source, ViewEntities.Brand destination, ResolutionContext context)
    {
        var item = new ViewEntities.Brand();

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
