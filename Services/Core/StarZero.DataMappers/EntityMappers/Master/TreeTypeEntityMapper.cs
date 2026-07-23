using AutoMapper;

namespace StarZero.DataMappers;

public class TreeTypeEntityMapper : ITypeConverter<DBO.TreeType, ViewEntities.TreeType>
{ 
    public ViewEntities.TreeType Convert(DBO.TreeType source, ViewEntities.TreeType destination, ResolutionContext context)
    {
        var item = new ViewEntities.TreeType();

        item.Id = source.Id;
        item.Name = source.Name;
        item.DisplayName = source.DisplayName;
        item.Description = source.Description;
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
