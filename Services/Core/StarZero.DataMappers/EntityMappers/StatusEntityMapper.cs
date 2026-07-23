using AutoMapper;

namespace StarZero.DataMappers;

public class StatusEntityMapper : ITypeConverter<DBO.Status, ViewEntities.Status>
{
    public ViewEntities.Status Convert(DBO.Status source, ViewEntities.Status destination, ResolutionContext context)
    {
        return new ViewEntities.Status
        {
            Id = source?.Id ?? 0,
            EntityType = source?.EntityType,
            Name = source?.Name ,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            Description = source?.Description,
            RowOrder = source?.RowOrder,
            DisplayInList = source?.DisplayInList?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}

