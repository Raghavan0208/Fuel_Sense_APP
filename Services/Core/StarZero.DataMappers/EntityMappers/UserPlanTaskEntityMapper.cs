using AutoMapper;

namespace StarZero.DataMappers;

public class UserPlanTaskEntityMapper : ITypeConverter<DBO.UserPlanTask, ViewEntities.UserPlanTask>
{
    public ViewEntities.UserPlanTask Convert(DBO.UserPlanTask source, ViewEntities.UserPlanTask destination, ResolutionContext context)
    {
        return new ViewEntities.UserPlanTask
        {
            Id = source?.Id ?? 0,
            UserPlanId = source?.UserPlanId ?? 0,
            UserReadingId = source?.UserReadingId ?? 0,
            TreeCount = source?.TreeCount ?? 0,
            PlantedCount = source?.PlantedCount ?? 0,
            AssignedTo = source?.AssignedTo ?? 0,          
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}