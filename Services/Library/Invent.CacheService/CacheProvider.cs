namespace Invent.CacheService;

public abstract class CacheProvider<TCache> : ICacheProvider
{
    public CacheProvider()
    {
        this.Cache = this.InitCache();
    }

    public CacheProvider(int durationInMinutes)
    {
        this.Cache = this.InitCache();
    }

    protected TCache Cache { get; set; }

    public abstract bool Get<T>(string key, out T value);

    public abstract void Set<T>(string key, T value);

    public abstract void Clear(string key);

    public abstract bool Exists(string key);

    public abstract IEnumerable<KeyValuePair<string, object>> GetAll();

    public abstract void FlushAll();

    protected abstract TCache InitCache();
}