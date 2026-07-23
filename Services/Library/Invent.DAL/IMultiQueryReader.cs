namespace Invent.DAL;

using Dapper;

public interface IMultiQueryReader<out TEntity>
{
    TEntity Map(SqlMapper.GridReader reader);
}
