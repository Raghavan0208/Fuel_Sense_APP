using AutoMapper;

namespace StarZero.DataMappers;

public class BrandSeriesEntityMapper : ITypeConverter<DBO.BrandSeries, ViewEntities.BrandSeries>
{
    public ViewEntities.BrandSeries Convert(DBO.BrandSeries source, ViewEntities.BrandSeries destination, ResolutionContext context)
    {
        var item = new ViewEntities.BrandSeries();

        item.Id = source.Id;
        item.BrandId = source.BrandId;
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
