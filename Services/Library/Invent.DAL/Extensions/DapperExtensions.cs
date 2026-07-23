namespace Invent.DAL.Extensions;

using System.Data.Common;
using Dapper;
using Invent.Helper;

internal static class DapperExtensions
{
    internal static IEnumerable<T> Select<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName)
    {
        string sqlQuery = GetSelectInlineQuery<T>(databaseType, tableName);
        return SqlMapper.Query<T>(cnn, sqlQuery);
    }

    internal static async Task<IEnumerable<T>> SelectAsync<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName)
    {
        string sqlQuery = GetSelectInlineQuery<T>(databaseType, tableName); ;
        return await SqlMapper.QueryAsync<T>(cnn, sqlQuery);
    }

    internal static T SelectById<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, long id)
    {
        string sqlQuery = GetSelectInlineQuery<T>(databaseType, tableName, "Id");
        sqlQuery = string.Concat(sqlQuery, "=@ID");

        return SqlMapper.QueryFirstOrDefault<T>(cnn, sqlQuery, new { ID = id });
    }

    internal static async Task<T> SelectByIdAsync<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, long id)
    {
        string sqlQuery = GetSelectInlineQuery<T>(databaseType, tableName, "Id");
        sqlQuery = string.Concat(sqlQuery, "=@ID");

        return await SqlMapper.QueryFirstOrDefaultAsync<T>(cnn, sqlQuery, new { ID = id });
    }

    internal static IEnumerable<T> SelectByIds<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, IEnumerable<long> ids)
    {
        string sqlQuery = GetSelectInlineQuery<T>(databaseType, tableName, "Id");
        sqlQuery = string.Concat(sqlQuery, " IN @Ids");

        return SqlMapper.Query<T>(cnn, sqlQuery, new { Ids = ids });
    }

    internal static async Task<IEnumerable<T>> SelectByIdsAsync<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, IEnumerable<long> ids)
    {
        string sqlQuery = GetSelectInlineQuery<T>(databaseType, tableName, "Id");
        sqlQuery = string.Concat(sqlQuery, " IN @Ids");

        return await SqlMapper.QueryAsync<T>(cnn, sqlQuery, new { Ids = ids });
    }

    internal static T Insert<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, dynamic param)
    {
        string sqlQuery = GetInsertQuery(databaseType, tableName, param);
        return SqlMapper.QueryFirstOrDefault<T>(cnn, sqlQuery, param);
    }

    internal static async Task<T> InsertAsync<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, dynamic param)
    {
        string sqlQuery = GetInsertQuery(databaseType, tableName, param);
        return await SqlMapper.QueryFirstOrDefaultAsync<T>(cnn, sqlQuery, param);
    }

    internal static int InsertBulk<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, dynamic param, dynamic items)
    {
        string sqlQuery = GetInsertQuery(databaseType, tableName, param);
        DbTransaction trans = cnn.BeginTransaction();
        int insertRecords = SqlMapper.Execute(cnn, sqlQuery, DynamicQuery.RemoveDefaultDateTimeValuesList(items), transaction: trans);
        trans.Commit();

        return insertRecords;
    }

    internal static async Task<int> InsertBulkAsync<T>(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, dynamic param, dynamic items)
    {
        string sqlQuery = GetInsertQuery(databaseType, tableName, param);
        DbTransaction trans = cnn.BeginTransaction();
        int insertRecords = await SqlMapper.ExecuteAsync(cnn, sqlQuery, DynamicQuery.RemoveDefaultDateTimeValuesList(items), transaction: trans);
        trans.Commit();

        return insertRecords;
    }

    internal static void Update(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, dynamic param)
    {
        string sqlQuery = GetUpdateQuery(databaseType, tableName, param);
        SqlMapper.Execute(cnn, sqlQuery, param);
    }

    internal static async Task UpdateAsync(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, dynamic param)
    {
        string sqlQuery = GetUpdateQuery(databaseType, tableName, param);
        await SqlMapper.ExecuteAsync(cnn, sqlQuery, param);
    }

    public static void UpdateBulk(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, dynamic param, dynamic items)
    {
        string sqlQuery = GetUpdateQuery(databaseType, tableName, param);
        SqlMapper.Execute(cnn, sqlQuery, DynamicQuery.RemoveDefaultDateTimeValuesList(items));
    }

    public static async Task UpdateBulkAsync(this DbConnection cnn, EntityBase.DBType databaseType, string tableName, dynamic param, dynamic items)
    {
        string sqlQuery = GetUpdateQuery(databaseType, tableName, param);
        await SqlMapper.ExecuteAsync(cnn, sqlQuery, DynamicQuery.RemoveDefaultDateTimeValuesList(items));
    }

    public static void Delete(this DbConnection cnn, string tableName, long id)
    {
        SqlMapper.Execute(cnn, DynamicQuery.GetDeleteQuery(tableName), new { ID = id });
    }

    public static void DeleteByColumn(this DbConnection cnn, string tableName, string columnName, long id)
    {
        SqlMapper.Execute(cnn, DynamicQuery.GetDeleteByColumnQuery(tableName, columnName), new { ID = id });
    }

    public static void DeleteByIds(this DbConnection cnn, string tableName, long[] ids)
    {
        SqlMapper.Execute(cnn, DynamicQuery.GetDeleteByIds(tableName), new { ID = ids });
    }

    private static string GetSelectInlineQuery<T>(EntityBase.DBType databaseType, string tableName, string condition = null)
    {
        if (databaseType == EntityBase.DBType.Postgres)
        {
            return NpgSQLQueryBuilder.ConstructSelectInlineQuery<T>(tableName, condition);
        }
        else if (databaseType == EntityBase.DBType.MySQL)
        {
            return MySQLQueryBuilder.ConstructSelectInlineQuery<T>(tableName, condition);
        }

        return MSSQLQueryBuilder.ConstructSelectInlineQuery<T>(tableName, condition);
    }

    private static string GetUpdateQuery(EntityBase.DBType databaseType, string tableName, dynamic param)
    {
        if (databaseType == EntityBase.DBType.Postgres)
        {
            return NpgSQLQueryBuilder.GetUpdateQuery(tableName, param);
        }
        else if (databaseType == EntityBase.DBType.MySQL)
        {
            return MySQLQueryBuilder.GetUpdateQuery(tableName, param);
        }

        return MSSQLQueryBuilder.GetUpdateQuery(tableName, param);
    }

    private static string GetInsertQuery(EntityBase.DBType databaseType, string tableName, dynamic param)
    {
        if (databaseType == EntityBase.DBType.Postgres)
        {
            return NpgSQLQueryBuilder.GetInsertQuery(tableName, param);
        }
        else if (databaseType == EntityBase.DBType.MySQL)
        {
            return MySQLQueryBuilder.GetInsertQuery(tableName, param);
        }

        return MSSQLQueryBuilder.GetInsertQuery(tableName, param);
    }
}
