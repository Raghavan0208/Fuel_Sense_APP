using AutoMapper;

namespace StarZero.DataMappers;

public class PlanReadingEntityMapper : ITypeConverter<DBO.PlanReading, ViewEntities.PlanReading>
{
    public ViewEntities.PlanReading Convert(DBO.PlanReading source, ViewEntities.PlanReading destination, ResolutionContext context)
    {
        return new ViewEntities.PlanReading
        {
            Id = source?.Id ?? 0,
            UserPlanId = source?.UserPlanId ?? 0,
            EntryDate = source?.EntryDate,
            Reading = source?.Reading?? 0,
            Co2Emission = source?.Co2Emission?? 0,
            Distance = source?.Distance?? 0,
            ReadingImagePath = source?.ReadingImagePath,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            Name = source?.Name ?? string.Empty,
        };
    }
}
