namespace Invent.Helper;

public class EntityBase
{

    /// <summary>
    /// Initializes a new instance of the <see cref="EntityBase" /> class.
    /// </summary>
    public EntityBase()
    {
    }

    /// <summary>
    /// Gets or sets Entity Id that represents unique value.
    /// </summary>
    public virtual long Id { get; set; }

    /// <summary>
    /// Gets or sets Represents entity created date.
    /// By default it's current time
    /// </summary>
    public virtual DateTime? Created { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets Represents who created the entity.
    /// </summary>
    public virtual long? CreatedBy { get; set; }

    /// <summary>
    /// Gets or sets Represents entity modified date.
    /// By default it's current time
    /// </summary>
    public virtual DateTime? Modified { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets Represents who modified the entity.
    /// </summary>
    public virtual long? ModifiedBy { get; set; }

    /// <summary>
    /// Gets or sets Represents entity Active true or false.
    /// By default it's true
    /// </summary>
    public virtual bool? Active { get; set; } = true;

    /// <summary>
    /// Entity Base Database Type.
    /// </summary>
    public enum DBType
    {
        MSSQL = 1,
        MySQL = 2,
        Postgres = 3
    }
}