using AutoMapper;

namespace StarZero.DataMappers;

public class LoginEntityMapper : ITypeConverter<DBO.Login, ViewEntities.Login>
{
    public ViewEntities.Login Convert(DBO.Login source, ViewEntities.Login destination, ResolutionContext context)
    {
        return new ViewEntities.Login
        {
            Id = source?.Id ?? 0,
            UserRoleId = source?.UserRoleId ?? 0,
            UserName = source?.UserName,
            PassWord = source?.PassWord,
            Salt = source?.Salt,
            IVKey = source?.IVKey,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
