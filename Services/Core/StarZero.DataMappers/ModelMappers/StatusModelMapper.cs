using AutoMapper;

namespace StarZero.DataMappers;

public class StatusModelMapper : ITypeConverter<ViewEntities.Status, DBO.Status>
{
    public DBO.Status Convert(ViewEntities.Status source, DBO.Status destination, ResolutionContext context)
    {
        return new DBO.Status
        {
            Id = source?.Id ?? 0,
            EntityType = source?.EntityType,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            Description = source?.Description,
            RowOrder = source?.RowOrder,
            DisplayInList = source?.DisplayInList ?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
