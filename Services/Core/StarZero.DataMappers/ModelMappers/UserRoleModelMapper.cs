using AutoMapper;

namespace StarZero.DataMappers;

public class UserRoleModelMapper : ITypeConverter<ViewEntities.UserRole, DBO.UserRole>
{
    public DBO.UserRole Convert(ViewEntities.UserRole source, DBO.UserRole destination, ResolutionContext context)
    {
        return new DBO.UserRole
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            Description = source?.Description,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
