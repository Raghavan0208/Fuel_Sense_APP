namespace Invent.CacheService;

using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;

public class InMemoryCacheService : CacheProvider<IMemoryCache>
{
    protected static readonly IMemoryCache Instance = new MemoryCache(new MemoryCacheOptions());
    private static object sync = new object();

    public InMemoryCacheService()
    {
    }

    public override bool Get<T>(string key, out T value)
    {
        try
        {
            if (this.Cache.Get<T>(key) == null)
            {
                value = default;
                return false;
            }

            value = this.Cache.Get<T>(key);
        }
        catch
        {
            value = default;
            return false;
        }

        return true;
    }

    public override void Set<T>(string key, T value)
    {
        if (!string.IsNullOrEmpty(key) && value != null)
        {
            if (this.Cache.TryGetValue(key, out _))
            {
                this.Cache.Remove(key);
            }

            TimeSpan remainingHours = TimeSpan.FromDays(1) - DateTime.Now.TimeOfDay;
            this.Cache.Set(
                        key,
                        value,
                        new MemoryCacheEntryOptions { AbsoluteExpiration = DateTime.Now.AddMinutes(remainingHours.TotalMinutes), Priority = CacheItemPriority.Low });
        }
    }

    public override void Clear(string key)
    {
        lock (sync)
        {
            this.Cache.Remove(key);
        }
    }

    public override bool Exists(string key)
    {
        lock (sync)
        {
            return this.Cache.Get(key) != null;
        }
    }

    public override IEnumerable<KeyValuePair<string, object>> GetAll()
    {
        throw new NotImplementedException();
    }

    public override void FlushAll()
    {
        this.Cache.Dispose();
    }

    protected override IMemoryCache InitCache()
    {
        return Instance;
    }
}
