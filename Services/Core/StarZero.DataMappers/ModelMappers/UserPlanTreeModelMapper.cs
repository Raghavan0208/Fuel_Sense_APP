using AutoMapper;

namespace StarZero.DataMappers;

public class UserPlanTreeModelMapper : ITypeConverter<ViewEntities.UserPlanTree, DBO.UserPlanTree>
{
    public DBO.UserPlanTree Convert(ViewEntities.UserPlanTree source, DBO.UserPlanTree destination, ResolutionContext context)
    {
        return new DBO.UserPlanTree
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
