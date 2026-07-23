using StarZero.ViewEntities;

namespace StarZero.Contracts.Interface.Master;

public interface IMasterModel : IBaseModel<Plans>
{
    /// <summary>
    /// For get all the data from Blogs
    /// </summary>
    /// <returns></returns>
    IEnumerable<Blogs> GetList();

    /// <summary>
    /// For get list based on vehicletypeid from Plans
    /// </summary>
    /// <param name="vehicletypeid"></param>
    /// <returns></returns>
    IEnumerable<Plans> GetVehicleTypeId(int vehicletypeid);

    /// <summary>
    /// For get list based on vehicletypeid from Plans
    /// </summary>
    /// <param name="vehicletypeid"></param>
    /// <returns></returns>
    IEnumerable<VehicleType> GetAllVehicleTypeList();

    /// <summary>
    /// For get list based on vehicletypeid from Plans
    /// </summary>
    /// <param name="vehicletypeid"></param>
    /// <returns></returns>
    IEnumerable<FuelType> GetFuelTypeList();

    /// <summary>
    /// For get list based on vehicletypeid from Plans
    /// </summary>
    /// <param name="vehicletypeid"></param>
    /// <returns></returns>
    IEnumerable<Brand> GetBrandList();

    /// <summary>
    /// For get list based on vehicletypeid from Plans
    /// </summary>
    /// <param name="vehicletypeid"></param>
    /// <returns></returns>
    IEnumerable<BrandVariant> GetBrandVarientList();

    /// <summary>
    /// For get list based on vehicletypeid from Plans
    /// </summary>
    /// <param name="vehicletypeid"></param>
    /// <returns></returns>
    IEnumerable<EmissionCategory> GetlEmissionCategoryList();

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <param name="vehicletypeid">request.</param>
    /// <returns>List in BrandSeries creation.</returns>
    IEnumerable<ViewEntities.Brand> GetBrandByVehicleTypeId(long vehicleTypeId);

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <param name="brandSeriesId">request.</param>
    /// <returns>List in BrandSeries creation.</returns>
    IEnumerable<ViewEntities.BrandVariant> GetBrandVariantByBrandSeriesId(long brandSeriesId);

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <param name="Brand">request.</param>
    /// <returns>List in BrandSeries creation.</returns>
    IEnumerable<ViewEntities.BrandSeries> GetBrandSeriesByBrandId(long brandId);

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <returns>List in Country list.</returns>
    IEnumerable<Country> GetAllCountrybyCountryCodeList();

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>  
    /// <returns>List in banner list.</returns>
    IEnumerable<CarousalBanner> GetCarousalBannerList();

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <returns>List in Address list.</returns>
    IEnumerable<Address> GetAddressList();

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <returns>List in Blog List.</returns>
    IEnumerable<Blogs> GetBlogsList();

    /// <summary>
    /// GetAll list Country used by CountryCode
    /// </summary>
    /// <returns></returns>
     IEnumerable<Country> GetCountryList();
}
