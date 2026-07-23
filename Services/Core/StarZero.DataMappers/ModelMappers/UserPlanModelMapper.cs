using AutoMapper;

namespace StarZero.DataMappers;

public class UserPlanModelMapper : ITypeConverter<ViewEntities.UserPlan, DBO.UserPlan>
{
    public DBO.UserPlan Convert(ViewEntities.UserPlan source, DBO.UserPlan destination, ResolutionContext context)
    {
        return new DBO.UserPlan
        {
            Id = source?.Id ?? 0,
            UserVehicleId = source?.UserVehicleId ?? 0,
            PlanId = source?.PlanId ?? 0,
            StatusId = source?.StatusId ?? 0,
            PurchaseDate = source?.PurchaseDate,
            TreeLimit = source?.TreeLimit ?? 0,
            PlanAmount = source?.PlanAmount ?? 0,
            MaximumEmission = source?.MaximumEmission ?? 0,
            CurrentEmission = source?.CurrentEmission ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            IsNewVehicle = source?.IsNewVehicle ?? false,
            StartingReading = source?.StartingReading ?? 0,
        };
    }
}
