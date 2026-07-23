using AutoMapper;

namespace StarZero.DataMappers;

public class BlogsEntityMapper : ITypeConverter<DBO.Blogs, ViewEntities.Blogs>
{
    public ViewEntities.Blogs Convert(DBO.Blogs source, ViewEntities.Blogs destination, ResolutionContext context)
    {
        var item = new ViewEntities.Blogs();

        item.Id = source.Id;
        item.CountryCode = source.CountryCode;
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
        item.ImageName = source.ImageName;
        item.BlogURL = source.BlogURL;
        item.BlogsLink = source.BlogsLink;
        return item;
    }
}
