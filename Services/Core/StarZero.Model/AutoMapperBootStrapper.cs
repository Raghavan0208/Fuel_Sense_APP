using AutoMapper;
using StarZero.DataMappers;

namespace StarZero.Model;

public class AutoMapperBootStrapper : Profile
{
    public AutoMapperBootStrapper()
    {
        // Entity Mappers

        this.CreateMap<DBO.Blogs, ViewEntities.Blogs>().ConvertUsing(new BlogsEntityMapper());
        this.CreateMap<DBO.Brand, ViewEntities.Brand>().ConvertUsing(new BrandEntityMapper());
        this.CreateMap<DBO.BrandSeries, ViewEntities.BrandSeries>().ConvertUsing(new BrandSeriesEntityMapper());
        this.CreateMap<DBO.BrandVariant, ViewEntities.BrandVariant>().ConvertUsing(new BrandVariantEntityMapper());
        this.CreateMap<DBO.Country, ViewEntities.Country>().ConvertUsing(new CountryEntityMapper());
        this.CreateMap<DBO.EmissionCategory, ViewEntities.EmissionCategory>().ConvertUsing(new EmissionCategoryEntityMapper());
        this.CreateMap<DBO.FuelType, ViewEntities.FuelType>().ConvertUsing(new FuelTypeEntityMapper());
        this.CreateMap<DBO.Plans, ViewEntities.Plans>().ConvertUsing(new PlansEntityMapper());
        this.CreateMap<DBO.TreeType, ViewEntities.TreeType>().ConvertUsing(new TreeTypeEntityMapper());
        this.CreateMap<DBO.VehicleType, ViewEntities.VehicleType>().ConvertUsing(new VehicleTypeEntityMapper());
        this.CreateMap<DBO.PlanReading, ViewEntities.PlanReading>().ConvertUsing(new PlanReadingEntityMapper());
        this.CreateMap<DBO.EmailTemplate, ViewEntities.EmailTemplate>().ConvertUsing(new EmailTemplateEntityMapper());
        this.CreateMap<DBO.SentEmail, ViewEntities.SentEmail>().ConvertUsing(new SentEmailEntityMapper());
        this.CreateMap<DBO.PendingEmail, ViewEntities.PendingEmail>().ConvertUsing(new PendingEmailEntityMapper());
        this.CreateMap<DBO.Login, ViewEntities.Login>().ConvertUsing(new LoginEntityMapper());
        this.CreateMap<DBO.PersonalDetail, ViewEntities.PersonalDetail>().ConvertUsing(new PersonalDetailEntityMapper());
        this.CreateMap<DBO.Status, ViewEntities.Status>().ConvertUsing(new StatusEntityMapper());
        this.CreateMap<DBO.UserPlan, ViewEntities.UserPlan>().ConvertUsing(new UserPlanEntityMapper());
        this.CreateMap<DBO.UserPlanTree, ViewEntities.UserPlanTree>().ConvertUsing(new UserPlanTreeEntityMapper());
        this.CreateMap<DBO.UserRole, ViewEntities.UserRole>().ConvertUsing(new UserRoleEntityMapper());
        this.CreateMap<DBO.UserVehicle, ViewEntities.UserVehicle>().ConvertUsing(new UserVehicleEntityMapper());
        this.CreateMap<DBO.ContactUs, ViewEntities.ContactUs>().ConvertUsing(new ContactUsEntityMapper());
        this.CreateMap<DBO.PaymentDetails, ViewEntities.PaymentDetails>().ConvertUsing(new PaymentDetailsEntityMapper());
        this.CreateMap<DBO.Address, ViewEntities.Address>().ConvertUsing(new AddressEntityMapper());
        this.CreateMap<DBO.CarousalBanner, ViewEntities.CarousalBanner>().ConvertUsing(new CarousalBannerEntityMapper());


        // Model Mappers

        this.CreateMap<ViewEntities.Blogs, DBO.Blogs>().ConvertUsing(new BlogsModelMapper());
        this.CreateMap<ViewEntities.Brand, DBO.Brand>().ConvertUsing(new BrandModelMapper());
        this.CreateMap<ViewEntities.BrandSeries, DBO.BrandSeries>().ConvertUsing(new BrandSeriesModelMapper());
        this.CreateMap<ViewEntities.BrandVariant, DBO.BrandVariant>().ConvertUsing(new BrandVariantModelMapper());
        this.CreateMap<ViewEntities.Country, DBO.Country>().ConvertUsing(new CountryModelMapper());
        this.CreateMap<ViewEntities.EmissionCategory, DBO.EmissionCategory>().ConvertUsing(new EmissionCategoryModelMapper());
        this.CreateMap<ViewEntities.FuelType, DBO.FuelType>().ConvertUsing(new FuelTypeModelMapper());
        this.CreateMap<ViewEntities.Plans, DBO.Plans>().ConvertUsing(new PlansModelMapper());
        this.CreateMap<ViewEntities.TreeType, DBO.TreeType>().ConvertUsing(new TreeTypeModelMapper());
        this.CreateMap<ViewEntities.VehicleType, DBO.VehicleType>().ConvertUsing(new VehicleTypeModelMapper());
        this.CreateMap<ViewEntities.PlanReading, DBO.PlanReading>().ConvertUsing(new PlanReadingModelMapper());
        this.CreateMap<ViewEntities.EmailTemplate, DBO.EmailTemplate>().ConvertUsing(new EmailTemplateModelMapper());
        this.CreateMap<ViewEntities.SentEmail, DBO.SentEmail>().ConvertUsing(new SentEmailModelMapper());
        this.CreateMap<ViewEntities.PendingEmail, DBO.PendingEmail>().ConvertUsing(new PendingEmailModelMapper());
        this.CreateMap<ViewEntities.Login, DBO.Login>().ConvertUsing(new LoginModelMapper());
        this.CreateMap<ViewEntities.PersonalDetail, DBO.PersonalDetail>().ConvertUsing(new PersonalDetailModelMapper());
        this.CreateMap<ViewEntities.Status, DBO.Status>().ConvertUsing(new StatusModelMapper());
        this.CreateMap<ViewEntities.UserPlan, DBO.UserPlan>().ConvertUsing(new UserPlanModelMapper());
        this.CreateMap<ViewEntities.UserPlanTree, DBO.UserPlanTree>().ConvertUsing(new UserPlanTreeModelMapper());
        this.CreateMap<ViewEntities.UserRole, DBO.UserRole>().ConvertUsing(new UserRoleModelMapper());
        this.CreateMap<ViewEntities.UserVehicle, DBO.UserVehicle>().ConvertUsing(new UserVehicleModelMapper());
        this.CreateMap<ViewEntities.ContactUs, DBO.ContactUs>().ConvertUsing(new ContactUsModelMapper());
        this.CreateMap<ViewEntities.PaymentDetails, DBO.PaymentDetails>().ConvertUsing(new PaymentDetailsModelMapper());
        this.CreateMap<ViewEntities.Address, DBO.Address>().ConvertUsing(new AddressModelMapper());
        this.CreateMap<ViewEntities.CarousalBanner, DBO.CarousalBanner>().ConvertUsing(new CarousalBannerModelMapper());


    }
}
