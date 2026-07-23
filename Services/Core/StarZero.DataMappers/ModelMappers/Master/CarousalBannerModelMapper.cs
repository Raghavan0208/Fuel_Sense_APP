using AutoMapper;

namespace StarZero.DataMappers;
public class CarousalBannerModelMapper : ITypeConverter<ViewEntities.CarousalBanner, DBO.CarousalBanner>
{
    public DBO.CarousalBanner Convert(ViewEntities.CarousalBanner source, DBO.CarousalBanner destination, ResolutionContext context)
    {
        var item = new DBO.CarousalBanner();

        item.Id = source.Id;
        item.CountryCode = source.CountryCode;
        item.Title = source.Title;
        item.Content = source.Content;
        item.DisplayInList = source.DisplayInList;
        item.ThumbnailPath = source.ThumbnailPath;
        item.RowOrder = source.RowOrder;
        item.Active = source.Active;
        item.Created = source.Created;
        item.CreatedBy = source.CreatedBy;
        item.Modified = source.Modified;
        item.ModifiedBy = source.ModifiedBy;

        return item;
    }
}
