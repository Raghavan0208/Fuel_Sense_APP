namespace Invent.CacheService;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Invent.Helper;

public static class CacheService<T> where T : EntityBase
{
    private static readonly ICacheProvider Cache = new InMemoryCacheService();

    public static IEnumerable<T> GetAllEntities()
    {
        Cache.Get<Dictionary<long, T>>(typeof(T).Name, out Dictionary<long, T> results);

        if (results != null && (results?.Any() ?? false))
        {
            return results.Select(item => item.Value);
        }

        return null;
    }

    public static IEnumerable<TOut> GetAllEntities<TOut>(Expression<Func<TOut, bool>> predicate = null)
    {
        Cache.Get<Dictionary<long, TOut>>(typeof(TOut).Name, out Dictionary<long, TOut> results);

        if (results != null && (results?.Any() ?? false))
        {
            return predicate is null ? results?.Select(item => item.Value) : results?.Select(item => item.Value)?.Where(predicate?.Compile());
        }

        return default;
    }

    public static T GetEntity(long id)
    {
        Cache.Get<Dictionary<long, T>>(typeof(T).Name, out Dictionary<long, T> results);

        if (results != null && results.Count > 0 && results.ContainsKey(id))
        {
            return results[id];
        }

        return default;
    }

    public static void AddUpdateEntities(IEnumerable<T> items)
    {
        Dictionary<long, T> lstItems = new Dictionary<long, T>(items.ToDictionary(item => item.Id, item => item));
        Cache.Clear(typeof(T).Name);
        Cache.Set<Dictionary<long, T>>(typeof(T).Name, lstItems);
    }


    public static void AddUpdateEntity(T item)
    {
        Cache.Get<Dictionary<long, T>>(typeof(T).Name, out Dictionary<long, T> lstResults);

        if (lstResults == null)
        {
            lstResults = new Dictionary<long, T>();
        }

        lstResults[item.Id] = item;
        Cache.Set<Dictionary<long, T>>(typeof(T).Name, lstResults);
    }

    public static void RemoveEntity(T item)
    {
        RemoveEntity(item.Id);
    }

    public static void RemoveEntity(long id)
    {
        Cache.Get<Dictionary<long, T>>(typeof(T).Name, out Dictionary<long, T> lstResults);

        if (lstResults != null && lstResults.Count > 0 && lstResults.ContainsKey(id))
        {
            lstResults.Remove(id);
        }
    }

    public static void AddUpdateEntities<TOut>(IEnumerable<TOut> items) where TOut : EntityBase
    {
        Dictionary<long, TOut> lstItems = new Dictionary<long, TOut>(items?.GroupBy(item => new { item.Id })
                                            ?.Select(item => item.FirstOrDefault())?.ToDictionary(item => item.Id, item => item));
        Cache.Clear(typeof(TOut).Name);
        Cache.Set<Dictionary<long, TOut>>(typeof(TOut).Name, lstItems);
    }

    public static void FlushCache()
    {
        if (Cache != null)
        {
            Cache.FlushAll();
        }
    }
}
