using AutoMapper;

namespace StarZero.DataMappers;

public class EmissionCategoryEntityMapper : ITypeConverter<DBO.EmissionCategory, ViewEntities.EmissionCategory>
{
    public ViewEntities.EmissionCategory Convert(DBO.EmissionCategory source, ViewEntities.EmissionCategory destination, ResolutionContext context)
    {
        var item = new ViewEntities.EmissionCategory();

        item.Id = source.Id;
        item.Name = source.Name;
        item.DisplayName = source.DisplayName;
        item.Description = source.Description;
        item.CO2Amount = source.CO2Amount;
        item.EnumName = source.EnumName;
        item.DisplayInList = source.DisplayInList;
        item.RowOrder = source.RowOrder;
        item.VehicleTypeId = source.VehicleTypeId;
        item.FuelTypeId = source.FuelTypeId;
        item.Active = source.Active;
        item.Created = source.Created;
        item.CreatedBy = source.CreatedBy;
        item.Modified = source.Modified;
        item.ModifiedBy = source.ModifiedBy;

        return item;
    }
}
