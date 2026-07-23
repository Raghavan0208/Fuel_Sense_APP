using AutoMapper;

namespace StarZero.DataMappers;

public class PlanReadingModelMapper : ITypeConverter<ViewEntities.PlanReading, DBO.PlanReading>
{
    public DBO.PlanReading Convert(ViewEntities.PlanReading source, DBO.PlanReading destination, ResolutionContext context)
    {
        return new DBO.PlanReading
        {
            Id = source?.Id ?? 0,
            UserPlanId = source?.UserPlanId ?? 0,
            EntryDate = source?.EntryDate,
            Reading = source?.Reading ?? 0,
            Co2Emission = source?.Co2Emission ?? 0,
            Distance = source?.Distance ?? 0,
            ReadingImagePath = source?.ReadingImagePath,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            Name = source?.Name ?? string.Empty,
        };
    }
}
