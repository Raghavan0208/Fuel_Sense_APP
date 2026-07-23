using AutoMapper;
using Microsoft.Extensions.Options;
using StarZero.Helper;
using StarZero.Model.Models.Master;

namespace StarZero.Model;

public class MasterEntitiesCache
{
    public static void Init(IOptionsSnapshot<AppConfiguration> config, IMapper mapper)
    {
        new BlogsModel(config, mapper).GetItems();
        //new BrandModel(config, mapper).GetItems();
        //new BrandSeriesModel(config, mapper).GetItems();
        //new BrandVariantModel(config, mapper).GetItems();
        new CountryModel(config, mapper).GetItems();
        //new EmissionCategoryModel(config, mapper).GetItems();
        //new FuelTypeModel(config, mapper).GetItems();
        //new PlansModel(config, mapper).GetItems();
        //new TreeTypeModel(config, mapper).GetItems();
        //new VehicleTypeModel(config, mapper).GetItems();
    }
}
