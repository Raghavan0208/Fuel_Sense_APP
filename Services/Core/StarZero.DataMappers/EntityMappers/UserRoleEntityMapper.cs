using AutoMapper;

namespace StarZero.DataMappers;

public class UserRoleEntityMapper : ITypeConverter<DBO.UserRole, ViewEntities.UserRole>
{
    public ViewEntities.UserRole Convert(DBO.UserRole source, ViewEntities.UserRole destination, ResolutionContext context)
    {
        return new ViewEntities.UserRole
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName ,
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

