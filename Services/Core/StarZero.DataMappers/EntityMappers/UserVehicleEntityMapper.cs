using AutoMapper;

namespace StarZero.DataMappers;

public class UserVehicleEntityMapper : ITypeConverter<DBO.UserVehicle, ViewEntities.UserVehicle>
{
    public ViewEntities.UserVehicle Convert(DBO.UserVehicle source, ViewEntities.UserVehicle destination, ResolutionContext context)
    {
        return new ViewEntities.UserVehicle
        {
            Id = source?.Id ?? 0,
            LoginId = source?.LoginId?? 0,
            BrandVariantId = source?.BrandVariantId ?? 0,
            FirstName = source?.FirstName,
            LastName = source?.LastName,
            RegistrationNumber = source?.RegistrationNumber,
            RegistrationDate = source?.RegistrationDate ,
            VehicleTypeId = source?.VehicleTypeId?? 0,
            FuelTypeId = source?.FuelTypeId?? 0,
            CO2Emission = source?.CO2Emission ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}