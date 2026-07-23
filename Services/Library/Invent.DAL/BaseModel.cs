namespace Invent.DAL;

using Invent.CacheService;
using Invent.Helper;
using StarZero.Helper;
using StarZero.Helper.Extensions;
using System.Linq.Expressions;
using System.Threading.Tasks;

public class BaseModel<T> : Repository<T> where T : EntityBase
{
    public BaseModel() : base()
    {
    }

    public bool LoadMasterFromCache { get; set; }

    #region
    public static string GetConnectionString(CountryContext context, DatabaseConfiguration database)
    {
        var result = database.CoreDBConnectionString;

        switch (context?.CountryCode?.ToUpper())
        {
            case "IN":
                result = database.DBConnectionStringIN;
                break;
            case "UK":
                result = database.DBConnectionStringUK;
                break;
            case "USA":
                result = database.DBConnectionStringUSA;
                break;
            default:
                result = database.CoreDBConnectionString;
                break;
        }

        return result;
    }
    #endregion

    #region Read Operations.ie Find and Get using Select Query
    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    public IEnumerable<T> GetItems()
    {
        IEnumerable<T> items = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities() : default;
        if (items?.Any() ?? false)
        {
            return items;
        }

        items = GetAll();
        if (this.LoadMasterFromCache)
        {
            Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntities(items);
            });
        }

        return items;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<T>> GetItemsAsync()
    {
        IEnumerable<T> items = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities() : default;
        if (items?.Any() ?? false)
        {
            return items;
        }

        items = await GetAllAsync();
        if (this.LoadMasterFromCache)
        {
            await Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntities(items);
            });
        }

        return items;
    }

    /// <summary>
    /// Select Record.
    /// </summary>
    /// <param name="id">Table Primary Key Id</param>
    /// <returns>TEntity</returns>
    public T FindItemById(long id)
    {
        T item = this.LoadMasterFromCache ? CacheService<T>.GetEntity(id) : default;
        if (item != null)
        {
            return item;
        }

        if (this.LoadMasterFromCache)
        {
            Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntities(GetAll());
            });
        }

        return FindById(id);
    }

    /// <summary>
    /// Async Select Record.
    /// </summary>
    /// <param name="id">Table Primary Key Id</param>
    /// <returns>TEntity</returns>
    public async Task<T> FindItemByIdAsync(long id)
    {
        T item = this.LoadMasterFromCache ? CacheService<T>.GetEntity(id) : default;
        if (item != null)
        {
            return item;
        }

        if (this.LoadMasterFromCache)
        {
            _ = Task.Factory.StartNew(async () =>
            {
                CacheService<T>.AddUpdateEntities(await GetAllAsync());
            });
        }

        return await FindByIdAsync(id);
    }

    public IEnumerable<T> FindItemsById(IEnumerable<long> ids)
    {
        IEnumerable<T> items = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities()?.Where(entity => (ids?.Contains(entity?.Id ?? 0) ?? false)) : default;
        if (items?.Any() ?? false)
        {
            return items;
        }

        if (this.LoadMasterFromCache)
        {
            Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntities(GetAll());
            });
        }

        return FindByIds(ids);
    }

    public async Task<IEnumerable<T>> FindItemsByIdAsync(IEnumerable<long> ids)
    {
        IEnumerable<T> items = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities()?.Where(entity => (ids?.Contains(entity?.Id ?? 0) ?? false)) : default;
        if (items?.Any() ?? false)
        {
            return items;
        }

        if (this.LoadMasterFromCache)
        {
            _ = Task.Factory.StartNew(async () =>
            {
                CacheService<T>.AddUpdateEntities(await GetAllAsync());
            });
        }

        return await FindByIdsAsync(ids);
    }

    /// <summary>
    /// Select Record Filter with Where Condition
    /// </summary>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public T FindItem(Expression<Func<T, bool>> predicate)
    {
        T item = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities()?.Where(predicate.Compile())?.FirstOrDefault() : default;
        if (item != null)
        {
            return item;
        }

        if (this.LoadMasterFromCache)
        {
            Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntities(GetAll());
            });
        }

        return FindFirstOrDefault(predicate);
    }

    /// <summary>
    /// Select Record Filter with Where Condition
    /// </summary>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public T FindLastItem(Expression<Func<T, bool>> predicate)
    {
        T item = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities()?.Where(predicate.Compile())?.LastOrDefault() : default;
        if (item != null)
        {
            return item;
        }

        if (this.LoadMasterFromCache)
        {
            Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntities(GetAll());
            });
        }

        return FindLastOrDefault(predicate);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public async Task<T> FindItemAsync(Expression<Func<T, bool>> predicate)
    {
        T item = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities()?.Where(predicate.Compile())?.FirstOrDefault() : default;
        if (item != null)
        {
            return item;
        }

        if (this.LoadMasterFromCache)
        {
            _ = Task.Factory.StartNew(async () =>
            {
                CacheService<T>.AddUpdateEntities(await GetAllAsync());
            });
        }

        return await FindFirstOrDefaultAsync(predicate);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public async Task<T> FindLastItemAsync(Expression<Func<T, bool>> predicate)
    {
        T item = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities()?.Where(predicate.Compile())?.LastOrDefault() : default;
        if (item != null)
        {
            return item;
        }

        if (this.LoadMasterFromCache)
        {
            _ = Task.Factory.StartNew(async () =>
            {
                CacheService<T>.AddUpdateEntities(await GetAllAsync());
            });
        }

        return await FindLastOrDefaultAsync(predicate);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public IEnumerable<T> FindItems(Expression<Func<T, bool>> predicate)
    {
        IEnumerable<T> items = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities()?.Where(predicate.Compile()) : default;
        if (items?.Any() ?? false)
        {
            return items;
        }

        if (this.LoadMasterFromCache)
        {
            Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntities(GetAll());
            });
        }

        return Find(predicate);
    }

    public async Task<IEnumerable<T>> FindItemsAsync(Expression<Func<T, bool>> predicate)
    {
        IEnumerable<T> items = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities()?.Where(predicate.Compile()) : default;
        if (items?.Any() ?? false)
        {
            return items;
        }

        if (this.LoadMasterFromCache)
        {
            _ = Task.Factory.StartNew(async () =>
            {
                CacheService<T>.AddUpdateEntities(await GetAllAsync());
            });
        }

        return await FindAsync(predicate);
    }
    #endregion

    #region Write Operations.ie Add or Update
    public long AddItem(T item)
    {
        if (item is null)
        {
            return default;
        }
        item.Created = DateTimeExtensions.GetCurrentUTC();
        item.Modified = DateTimeExtensions.GetCurrentUTC();
        item.Id = Add(item);

        if (this.LoadMasterFromCache)
        {
            Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntity(this.FindById(item.Id));
            });
        }

        return item.Id;
    }

    public async Task<long> AddItemAsync(T item)
    {
        if (item is null)
        {
            return default;
        }

        item.Id = await AddAsync(item);

        if (this.LoadMasterFromCache)
        {
            _ = Task.Factory.StartNew(async () =>
            {
                CacheService<T>.AddUpdateEntity(await this.FindByIdAsync(item.Id));
            });
        }

        return item.Id;
    }

    public void AddItems(IList<T> items)
    {
        if (items?.Any() ?? false)
        {
            AddBulk(items);

            if (this.LoadMasterFromCache)
            {
                Task.Factory.StartNew(() =>
                {
                    CacheService<T>.AddUpdateEntities(GetAll());
                });
            }
        }
    }

    public async Task AddItemsAsync(IList<T> items)
    {
        if (items?.Any() ?? false)
        {
            await AddBulkAsync(items);

            if (this.LoadMasterFromCache)
            {
                _ = Task.Factory.StartNew(async () =>
                {
                    CacheService<T>.AddUpdateEntities(await GetAllAsync());
                });
            }
        }
    }

    public void UpdateItem(T item)
    {
        if (item == null)
        {
            return;
        }

        item.Created = item?.Created is not null ? item.Created : DateTimeExtensions.GetCurrentUTC();
        item.Modified = DateTimeExtensions.GetCurrentUTC();
        Update(item);

        if (this.LoadMasterFromCache)
        {
            Task.Factory.StartNew(() =>
            {
                CacheService<T>.AddUpdateEntity(this.FindById(item.Id));
            });
        }
    }

    public async Task UpdateItemAsync(T item)
    {
        if (item == null)
        {
            return;
        }

        await UpdateAsync(item);

        if (this.LoadMasterFromCache)
        {
            _ = Task.Factory.StartNew(async () =>
            {
                CacheService<T>.AddUpdateEntity(await this.FindByIdAsync(item.Id));
            });
        }
    }

    public void UpdateItems(IList<T> items)
    {
        if (items?.Any() ?? false)
        {
            UpdateBulk(items);

            if (this.LoadMasterFromCache)
            {
                Task.Factory.StartNew(() =>
                {
                    CacheService<T>.AddUpdateEntities(GetAll());
                });
            }
        }
    }

    public async Task UpdateItemsAsync(IList<T> items)
    {
        if (items?.Any() ?? false)
        {
            await UpdateBulkAsync(items);

            if (this.LoadMasterFromCache)
            {
                _ = Task.Factory.StartNew(async () =>
                {
                    CacheService<T>.AddUpdateEntities(await GetAllAsync());
                });
            }
        }
    }
    #endregion

    #region Read Operation using Views
    public override IEnumerable<TOut> ExecViewResult<TOut>(string procedureName, Expression<Func<TOut, bool>> predicate = null)
    {
        IEnumerable<TOut> items = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities<TOut>(predicate) : default;
        if (items is null || (!items?.Any() ?? false))
        {
            items = base.ExecViewResult<TOut>(procedureName, predicate);
            if (this.LoadMasterFromCache)
            {
                Task.Factory.StartNew(() =>
                {
                    CacheService<T>.AddUpdateEntities<TOut>(base.ExecViewResult<TOut>(procedureName));
                });

            }
        }

        return items;
    }

    public override async Task<IEnumerable<TOut>> ExecViewResultAsync<TOut>(string procedureName, Expression<Func<TOut, bool>> predicate = null)
    {
        IEnumerable<TOut> items = this.LoadMasterFromCache ? CacheService<T>.GetAllEntities<TOut>(predicate) : default;
        if (items is null || (!items?.Any() ?? false))
        {
            items = await base.ExecViewResultAsync(procedureName, predicate);
            if (this.LoadMasterFromCache)
            {
                _ = Task.Factory.StartNew(async () =>
                {
                    CacheService<T>.AddUpdateEntities<TOut>(await base.ExecViewResultAsync<TOut>(procedureName));
                });
            }
        }

        return items;
    }
    #endregion
}
