using AutoMapper;

namespace StarZero.DataMappers;

public class PlansEntityMapper : ITypeConverter<DBO.Plans, ViewEntities.Plans>
{
    public ViewEntities.Plans Convert(DBO.Plans source, ViewEntities.Plans destination, ResolutionContext context)
    {
        var item = new ViewEntities.Plans();

        item.Id = source.Id;
        item.VehicleTypeId = source.VehicleTypeId;
        item.Name = source.Name;
        item.DisplayName = source.DisplayName;
        item.Description = source.Description;  
        item.TreeCount = source.TreeCount;
        item.EnumName = source.EnumName;
        item.Amount = source.Amount;
        item.IsMostPopular = source.IsMostPopular;
        item.TreeFrequency = source.TreeFrequency;
        item.TreesToPlant = source.TreesToPlant;
        item.FinaltreeCount = source.FinaltreeCount;
        item.DisplayInList = source.DisplayInList;
        item.RowOrder = source.RowOrder;
        item.Active = source.Active;
        item.Created = source.Created;
        item.CreatedBy = source.CreatedBy;
        item.Modified = source.Modified;
        item.ModifiedBy = source.ModifiedBy;
        item.CO2limit = source.CO2limit;

        return item;
    }
}
