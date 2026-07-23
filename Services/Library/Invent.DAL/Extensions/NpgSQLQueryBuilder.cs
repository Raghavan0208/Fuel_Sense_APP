namespace Invent.DAL.Extensions;

using System.Dynamic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using Invent.DAL.Helper;

public static class NpgSQLQueryBuilder
{
    /// <summary>
    /// Gets the insert query
    /// </summary>
    /// <param name="tableName">tableName parameter which needs to specify where to insert</param>
    /// <param name="item">item parameter which needs to be inserted</param>
    /// <returns>inserted item</returns>
    internal static string GetInsertQuery(string tableName, dynamic item)
    {
        item = DynamicQuery.RemoveDefaultDateTimeValues(item);
        PropertyInfo[] props = item.GetType().GetProperties();
        string[] columns = props.GetValidTableColumns().Select(p => p.Name).ToArray();

        return string.Format("INSERT INTO {0} ({1}) VALUES (@{2}) RETURNING Id", tableName, string.Join(",", columns), string.Join(",@", columns));
    }

    internal static string GetInsertBulkQuery(string tableName, dynamic item)
    {
        PropertyInfo[] props = item.GetType().GetProperties();
        string[] columns = props.GetValidTableColumns().Select(p => p.Name).ToArray();

        return string.Format("INSERT INTO {0} ({1}) OUTPUT Inserted.Id into ##Inserted VALUES (@{2})", tableName, string.Join(",", columns), string.Join(",@", columns));
    }

    /// <summary>
    /// Gets the update query
    /// </summary>
    /// <param name="tableName">tableName parameter which needs to specify where to update</param>
    /// <param name="item">item parameter which needs to be updated</param>
    /// <returns>updated items</returns>
    internal static string GetUpdateQuery(string tableName, dynamic item)
    {
        PropertyInfo[] props = item.GetType().GetProperties();
        string[] columns = props.GetValidTableColumns().Select(p => p.Name).ToArray();
        List<string> parameters = columns.Select(name => name + "=@" + name).ToList();

        return string.Format("UPDATE {0} SET {1} WHERE ID=@ID", tableName, string.Join(",", parameters));
    }

    /// <summary>
    /// Gets the dynamic query.
    /// </summary>
    /// <typeparam name="T">type of value to be process the query</typeparam>
    /// <param name="tableName">tableName parameter which needs to where to get the values</param>
    /// <param name="expression">expression parameter</param>
    /// <param name="countQuery">count query parameter</param>
    /// <returns>List of query objects</returns>
    internal static QueryResult GetDynamicQuery<T>(string tableName, Expression<Func<T, bool>> expression, bool countQuery = false)
    {
        List<QueryParameter> queryProperties = new List<QueryParameter>();
        IDictionary<string, object> expando = new ExpandoObject();
        StringBuilder builder = new StringBuilder();

        if (expression != null)
        {
            BinaryExpression body = (BinaryExpression)expression.Body;

            // walk the tree and build up a list of query parameter objects
            // from the left and right branches of the expression tree
            DynamicQuery.WalkTree(body, ExpressionType.Default, ref queryProperties);
        }

        // convert the query parms into a SQL string and dynamic property object
        builder.Append(string.Format("SELECT {0} FROM ", countQuery ? "COUNT(Id) as COUNT" : tableName.GetValidSelectColumns<T>()));
        builder.Append(tableName);
        builder.Append(" WHERE ");

        if (queryProperties.Count == 0)
        {
            builder.Append("1 = 1");
        }

        for (int i = 0; i < queryProperties.Count(); i++)
        {
            QueryParameter item = queryProperties[i];

            if (!string.IsNullOrEmpty(item.LinkingOperator) && i > 0)
            {
                builder.Append(string.Format("{0} {1} {2} @{1} ", item.LinkingOperator, item.PropertyName, item.QueryOperator));
            }
            else
            {
                builder.Append(string.Format("{0} {1} @{0} ", item.PropertyName, item.QueryOperator));
            }

            expando[item.PropertyName] = item.PropertyValue;
        }

        return new QueryResult(builder.ToString().TrimEnd(), expando);
    }

    public static string ConstructSelectInlineQuery<T>(this string tableName, string conditions = "")
    {
        string query = string.Concat("SELECT ", tableName.GetValidSelectColumns<T>(), " FROM ", tableName);
        query = string.Concat(query, string.IsNullOrEmpty(conditions) ? string.Empty : " WHERE " + conditions);

        return query;
    }
}
