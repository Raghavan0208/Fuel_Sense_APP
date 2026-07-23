namespace StarZero.API.Helpers;

using Contracts;
using Invent.DAL;
using Microsoft.Extensions.DependencyInjection;
using Model;
using StarZero.Contracts.Interface.Master;
using StarZero.Model.Models.Master;

public static class DIExtensions
{
    public static IServiceCollection RegisterModelDependencies(this IServiceCollection services)
    {
        services.AddScoped<IMasterModel, MasterModel>();
        services.AddScoped<IContactUsModel, ContactUsModel>();
        services.AddScoped<IEmailTemplateModel, EmailTemplateModel>();
        services.AddScoped<ISentEmailModel, SentEmailModel>();
        services.AddScoped<IPendingEmailModel, PendingEmailModel>();
        services.AddScoped<ILoginModel, LoginModel>();
        services.AddScoped<IPersonalDetailModel, PersonalDetailModel>();
        services.AddScoped<IPlanReadingModel, PlanReadingModel>();
        services.AddScoped<IUserPlanModel, UserPlanModel>();
        services.AddScoped<IUserPlanTreeModel, UserPlanTreeModel>();
        services.AddScoped<IUserRoleModel, UserRoleModel>();
        services.AddScoped<IStatusModel, StatusModel>();
        services.AddScoped<IUserVehicleModel, UserVehicleModel>();


        services.AddScoped<IBlogsModel, BlogsModel>();
        services.AddScoped<IBrandModel, BrandModel>();
        services.AddScoped<IBrandVariantModel, BrandVariantModel>();
        services.AddScoped<ICountryModel, CountryModel>();
        services.AddScoped<IEmissionCategoryModel, EmissionCategoryModel>();
        services.AddScoped<IFuelTypeModel, FuelTypeModel>();
        services.AddScoped<IPlansModel, PlansModel>();
        services.AddScoped<ITreeTypeModel, TreeTypeModel>();
        services.AddScoped<IVehicleTypeModel, VehicleTypeModel>();
        services.AddScoped<IRegistrationModel, RegistrationModel>();
        services.AddScoped<IPaymentDetailsModel, PaymentDetailsModel>();
        services.AddScoped<IAddressModel, AddressModel>();
        services.AddScoped<ICarousalBannerModel, CarousalBannerModel>();
        services.AddScoped<CountryContext, CountryContextHelper>();

        return services;
    }
}