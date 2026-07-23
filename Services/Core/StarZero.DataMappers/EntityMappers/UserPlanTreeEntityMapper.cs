using AutoMapper;

namespace StarZero.DataMappers;

public class UserPlanTreeEntityMapper : ITypeConverter<DBO.UserPlanTree, ViewEntities.UserPlanTree>
{
    public ViewEntities.UserPlanTree Convert(DBO.UserPlanTree source, ViewEntities.UserPlanTree destination, ResolutionContext context)
    {
        return new ViewEntities.UserPlanTree
        {
            Id = source?.Id ?? 0,
            UserPlanId = source?.UserPlanId ?? 0,
            UserPlanTaskId = source?.UserPlanTaskId ?? 0,
            TreeTypeId = source?.TreeTypeId ?? 0,
            PlantedDate = source?.PlantedDate,
            GeoLocation = source?.GeoLocation,
            PlantedBy = source?.PlantedBy ?? 0,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}