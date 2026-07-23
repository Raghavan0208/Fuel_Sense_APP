using AutoMapper;

namespace StarZero.DataMappers;

public class EmissionCategoryModelMapper : ITypeConverter<ViewEntities.EmissionCategory, DBO.EmissionCategory>
{
    public DBO.EmissionCategory Convert(ViewEntities.EmissionCategory source, DBO.EmissionCategory destination, ResolutionContext context)
    {
        var item = new DBO.EmissionCategory();

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
