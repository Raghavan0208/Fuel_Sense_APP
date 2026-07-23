using AutoMapper;

namespace StarZero.DataMappers;

public class BrandVariantEntityMapper : ITypeConverter<DBO.BrandVariant, ViewEntities.BrandVariant>
{
    public ViewEntities.BrandVariant Convert(DBO.BrandVariant source, ViewEntities.BrandVariant destination, ResolutionContext context)
    {
        var item = new ViewEntities.BrandVariant();

        item.Id = source.Id;
        item.BrandSeriesId = source.BrandSeriesId;
        item.FuelTypeId = source.FuelTypeId;
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
