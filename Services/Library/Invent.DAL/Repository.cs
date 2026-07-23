namespace Invent.DAL;

using Dapper;
using Invent.DAL.Extensions;
using Invent.DAL.Helper;
using Invent.Helper;
using MySql.Data.MySqlClient;
using Npgsql;
using StarZero.DAL.Interfaces;
using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq.Expressions;

public abstract class Repository<T> where T : EntityBase
{
    protected internal string ConnectionString { get; protected set; }

    protected internal EntityBase.DBType DatabaseType { get; protected set; } = EntityBase.DBType.MySQL;

    private readonly string tableName;

    public Repository()
    {
        tableName = typeof(T).Name.ToLower();
    }


    internal DbConnection Connection
    {
        get
        {
            if (this.DatabaseType == EntityBase.DBType.Postgres)
            {
                return new NpgsqlConnection(this.ConnectionString);
            }
            if (this.DatabaseType == EntityBase.DBType.MySQL)
            {
                return new MySqlConnection(this.ConnectionString);
            }

            return new SqlConnection(this.ConnectionString);
        }
    }

    internal IEnumerable<T> GetAll()
    {
        using DbConnection cn = Connection;
        cn.Open();
        return cn.Select<T>(this.DatabaseType, tableName);
    }

    internal async Task<IEnumerable<T>> GetAllAsync()
    {
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.SelectAsync<T>(this.DatabaseType, tableName);
    }

    internal IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
    {
        QueryResult result = this.GetDynamicQuery(tableName, predicate);
        using DbConnection cn = Connection;
        cn.Open();
        return cn.Query<T>(result.Sql, (object)result.Param)?.Where(predicate.Compile());
    }

    internal async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        QueryResult result = this.GetDynamicQuery(tableName, predicate);

        using DbConnection cn = Connection;
        cn.Open();
        IEnumerable<T> resultSet = await cn.QueryAsync<T>(result.Sql, (object)result.Param);
        return resultSet?.Where(predicate.Compile());
    }

    internal T FindById(long id)
    {
        using DbConnection cn = Connection;
        cn.Open();
        return cn.SelectById<T>(this.DatabaseType, tableName, id);
    }

    internal async Task<T> FindByIdAsync(long id)
    {
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.SelectByIdAsync<T>(this.DatabaseType, tableName, id);
    }

    internal IEnumerable<T> FindByIds(IEnumerable<long> ids, string columnName = "Id")
    {
        using DbConnection cn = Connection;
        cn.Open();
        IEnumerable<T> items = cn.SelectByIds<T>(this.DatabaseType, tableName, ids);

        if ((items?.Any() ?? false) && columnName.Equals("Id"))
        {
            items = items?.Where(item => (ids?.Contains(item.Id) ?? false));
        }

        return items;
    }

    internal async Task<IEnumerable<T>> FindByIdsAsync(IEnumerable<long> ids, string columnName = "Id")
    {
        using DbConnection cn = Connection;
        cn.Open();
        IEnumerable<T> items = await cn.SelectByIdsAsync<T>(this.DatabaseType, tableName, ids);

        if ((items?.Any() ?? false) && columnName.Equals("Id"))
        {
            items = items?.Where(item => (ids?.Contains(item.Id) ?? false));
        }

        return items;
    }

    internal T FindFirstOrDefault(Expression<Func<T, bool>> predicate)
    {
        QueryResult result = this.GetDynamicQuery(tableName, predicate);
        using DbConnection cn = Connection;
        cn.Open();
        return cn.QueryFirstOrDefault<T>(result.Sql, (object)result.Param);
    }

    internal async Task<T> FindFirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
    {
        QueryResult result = this.GetDynamicQuery(tableName, predicate);
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.QueryFirstOrDefaultAsync<T>(result.Sql, (object)result.Param);
    }

    internal T FindLastOrDefault(Expression<Func<T, bool>> predicate, string columnName = "Id")
    {
        QueryResult result = this.GetDynamicQuery(tableName, predicate);
        string query = $" Order by {columnName} DESC;";
        using DbConnection cn = Connection;
        cn.Open();
        return cn.QueryFirstOrDefault<T>(string.Concat(result.Sql, query), (object)result.Param);
    }

    internal async Task<T> FindLastOrDefaultAsync(Expression<Func<T, bool>> predicate, string columnName = "Id")
    {
        QueryResult result = this.GetDynamicQuery(tableName, predicate);
        string query = $" Order by {columnName} DESC;";
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.QueryFirstOrDefaultAsync<T>(string.Concat(result.Sql, query), (object)result.Param);
    }
   
    public virtual IEnumerable<TOut> ExecStoredProcedure<TOut>(string procedureName, dynamic item)
    {
        using DbConnection cn = Connection;
        cn.Open();
        return cn.Query<TOut>(procedureName, (object)item, commandType: CommandType.StoredProcedure);
    }

    internal async Task<IEnumerable<TOut>> ExecStoredProcedureAsync<TOut>(string procedureName, dynamic item = null)
    {
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.QueryAsync<TOut>(procedureName, (object)item, commandType: CommandType.StoredProcedure);
    }

    internal async Task<TEntity> ExecStoredProcedureQueryMultipleAsync<TEntity, TMapper>(string procedureName, dynamic item, int? commandTimeout = null)
                                                                                                                where TMapper : IMultiQueryReader<TEntity>
    {
        using DbConnection cn = Connection;
        cn.Open();
        SqlMapper.GridReader result = await cn.QueryMultipleAsync(procedureName, (object)item, commandType: CommandType.StoredProcedure, commandTimeout: commandTimeout);
        return Activator.CreateInstance<TMapper>().Map(result);
    }
    public virtual TEntity ExecStoredProcedureQueryMultiple<TEntity, TMapper>(string procedureName, dynamic item)
                                                                                                                   where TMapper : IMapper<TEntity>
    {
        using (DbConnection cn = this.Connection)
        {
            var parameters = (object)item;
            cn.Open();
            var result = cn.QueryMultiple(procedureName, parameters, commandType: CommandType.StoredProcedure);
            var mappedResult = Activator.CreateInstance<TMapper>().Map(result);

            return mappedResult;
        }
    }
    public TEntity ExecStoredProcedureQueryMultiple<TEntity, TMapper>(string procedureName, dynamic item, int? commandTimeout = null)
                                                                                              where TMapper : IMultiQueryReader<TEntity>
    {
        using DbConnection cn = Connection;
        cn.Open();
        SqlMapper.GridReader result = cn.QueryMultiple(procedureName, (object)item, commandType: CommandType.StoredProcedure, commandTimeout: commandTimeout);
        return Activator.CreateInstance<TMapper>().Map(result);
    }

    public virtual IEnumerable<TOut> ExecViewResult<TOut>(string procedureName, Expression<Func<TOut, bool>> predicate = null) where TOut : EntityBase
    {
        QueryResult result = this.GetDynamicQuery(procedureName, predicate);
        using DbConnection cn = Connection;
        cn.Open();
        return cn.Query<TOut>(result.Sql, (object)result.Param);
    }

    public virtual async Task<IEnumerable<TOut>> ExecViewResultAsync<TOut>(string procedureName, Expression<Func<TOut, bool>> predicate = null) where TOut : EntityBase
    {
        QueryResult result = this.GetDynamicQuery<TOut>(tableName, predicate);
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.QueryAsync<TOut>(result.Sql, (object)result.Param);
    }

    internal long Add(T item)
    {
        using DbConnection cn = Connection;
        cn.Open();
        return cn.Insert<long>(this.DatabaseType, tableName, (object)item);
    }

    internal async Task<long> AddAsync(T item)
    {
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.InsertAsync<long>(this.DatabaseType, tableName, (object)item);
    }

    internal int AddBulk(IList<T> item)
    {
        using DbConnection cn = Connection;
        cn.Open();
        return cn.InsertBulk<int>(this.DatabaseType, tableName, param: (object)item?.FirstOrDefault(), items: item);
    }

    internal async Task<int> AddBulkAsync(IList<T> item)
    {
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.InsertBulkAsync<int>(this.DatabaseType, tableName, param: (object)item?.FirstOrDefault(), items: item);
    }

    internal void Update(T item)
    {
        using DbConnection cn = Connection;
        item.Modified = DateTime.Now;
        cn.Open();
        cn.Update(this.DatabaseType, tableName, (object)item);
    }

    internal async Task UpdateAsync(T item)
    {
        using DbConnection cn = Connection;
        item.Modified = DateTime.Now;
        cn.Open();
        await cn.UpdateAsync(this.DatabaseType, tableName, (object)item);
    }

    internal void UpdateBulk(IList<T> item)
    {
        using DbConnection cn = Connection;
        _ = item.Select(itm => itm.Modified = DateTime.UtcNow);
        cn.Open();
        cn.UpdateBulk(this.DatabaseType, tableName, item.FirstOrDefault(), item);
    }

    internal async Task UpdateBulkAsync(IList<T> item)
    {
        using DbConnection cn = Connection;
        _ = item.Select(itm => itm.Modified = DateTime.UtcNow);
        cn.Open();
        await cn.UpdateBulkAsync(this.DatabaseType, tableName, item.FirstOrDefault(), item);
    }

    public long? GetCount(Expression<Func<T, bool>> predicate)
    {
        QueryResult result = this.GetDynamicQuery(tableName, predicate, countQuery: true);
        using DbConnection cn = Connection;
        cn.Open();
        return cn.QueryFirstOrDefault<long?>(result.Sql, (object)result.Param);
    }

    public async Task<long?> GetCountAsync(Expression<Func<T, bool>> predicate)
    {
        QueryResult result = this.GetDynamicQuery(tableName, predicate, countQuery: true);
        using DbConnection cn = Connection;
        cn.Open();
        return await cn.QueryFirstOrDefaultAsync<long?>(result.Sql, (object)result.Param);
    }

    public IEnumerable<Tout> InlineSelectQuery<Tout>(string sqlQuery, object paramater = null)
    {
        using DbConnection con = Connection;
        con.Open();
        return con.Query<Tout>(sqlQuery, param: paramater);
    }

    public async Task<IEnumerable<Tout>> InlineSelectQueryAsync<Tout>(string sqlQuery, object paramater = null)
    {
        using DbConnection con = Connection;
        con.Open();
        return await con.QueryAsync<Tout>(sqlQuery, param: paramater);
    }

    public Tout InlineExecuteScalarQuery<Tout>(string sqlQuery, object paramater = null)
    {
        using DbConnection con = Connection;
        con.Open();
        return con.ExecuteScalar<Tout>(sqlQuery, param: paramater);
    }

    public async Task<Tout> InlineExecuteScalarQueryAsync<Tout>(string sqlQuery, object paramater = null)
    {
        using DbConnection con = Connection;
        con.Open();
        return await con.ExecuteScalarAsync<Tout>(sqlQuery, param: paramater);
    }

    public void InlineExcuteQuery(string sqlQuery, object paramater = null)
    {
        using DbConnection con = Connection;
        con.Open();
        con.Execute(sqlQuery, param: paramater);
    }

    public async Task InlineExcuteQueryAsync(string sqlQuery, object paramater = null)
    {
        using DbConnection con = Connection;
        con.Open();
        await con.ExecuteAsync(sqlQuery, param: paramater);
    }

    private QueryResult GetDynamicQuery<T>(string tableName, Expression<Func<T, bool>> predicate, bool countQuery = false)
    {
        if (this.DatabaseType == EntityBase.DBType.Postgres)
        {
            return NpgSQLQueryBuilder.GetDynamicQuery<T>(tableName, predicate, countQuery);
        }
        if (this.DatabaseType == EntityBase.DBType.MySQL)
        {
            return MySQLQueryBuilder.GetDynamicQuery<T>(tableName, predicate, countQuery);
        }

        return MSSQLQueryBuilder.GetDynamicQuery<T>(tableName, predicate, countQuery);
    }
}
