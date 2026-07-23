namespace Invent.DAL.Extensions;

using System.Linq.Expressions;
using System.Reflection;
using Invent.DAL.Helper;

internal static class DynamicQuery
{
    /// <summary>
    /// Removes the default DateTime value and update to null.
    /// </summary>
    /// <param name="item">item parameter which needs to change its default DateTime value</param>
    /// <returns>changed DateTime value</returns>
    internal static dynamic RemoveDefaultDateTimeValues(dynamic item)
    {
        foreach (PropertyInfo propertyInfo in item.GetType().GetProperties())
        {
            if (propertyInfo.PropertyType == typeof(DateTime))
            {
                DateTime? date = (DateTime)propertyInfo.GetValue(item, null);
                if (date.Equals(DateTime.MinValue))
                {
                    propertyInfo.SetValue(item, DateTime.Now, null);
                }
            }
        }

        return item;
    }

    /// <summary>
    /// Changing Min Datetime to Today Datetime for List of items
    /// </summary>
    /// <param name="items">List items</param>
    /// <returns>Min Datetime changed to Today Datetime</returns>
    internal static dynamic RemoveDefaultDateTimeValuesList(dynamic items)
    {
        foreach (var item in items)
        {
            foreach (PropertyInfo propertyInfo in item.GetType().GetProperties())
            {
                if (propertyInfo.PropertyType == typeof(DateTime))
                {
                    DateTime? date = (DateTime)propertyInfo.GetValue(item, null);
                    if (date.Equals(DateTime.MinValue))
                    {
                        propertyInfo.SetValue(item, DateTime.Now, null);
                    }
                }
            }
        }

        return items;
    }

    internal static string GetDeleteQuery(string tableName)
    {
        return $"DELETE FROM {tableName} WHERE Id=@ID";
    }

    internal static string GetDeleteByColumnQuery(string tableName, string columnName)
    {
        return $"DELETE FROM {tableName} WHERE {columnName}=@ID";
    }

    internal static string GetDeleteByIds(string tableName)
    {
        return $"DELETE FROM {tableName} WHERE Id IN @Ids";
    }

    private static string GetMemberName<TEntity>(this Expression<Func<TEntity, object>> sortBy)
    {
        string memberName = string.Empty;
        if (sortBy != null)
        {
            MemberExpression expression = sortBy.Body is UnaryExpression ? ((UnaryExpression)sortBy.Body).Operand as MemberExpression : (MemberExpression)sortBy.Body;
            memberName = expression.Member.Name;
        }

        return memberName;
    }

    /// <summary>
    /// Walks the tree.
    /// </summary>
    /// <param name="body">body parameter</param>
    /// <param name="linkingType">linkingType parameter to spec</param>
    /// <param name="queryProperties">queryProperties parameter which is the list of QueryParameter reference</param>
    internal static void WalkTree(BinaryExpression body, ExpressionType linkingType, ref List<QueryParameter> queryProperties)
    {
        if (body.NodeType != ExpressionType.AndAlso && body.NodeType != ExpressionType.OrElse)
        {
            string propertyName = GetPropertyName(body);
            dynamic propertyValue = Expression.Lambda(body.Right).Compile().DynamicInvoke();
            string opr = GetOperator(body.NodeType);
            string link = GetOperator(linkingType);

            queryProperties.Add(new QueryParameter(link, propertyName, propertyValue, opr));
        }
        else if (body.Right.NodeType == ExpressionType.Call)
        {
            string propertyName = string.Empty;
            string opr = string.Empty;
            string link = string.Empty;
            object propertyValue = null;

            var expression = (MethodCallExpression)body.Right;
            if (expression != null && expression.Arguments.FirstOrDefault() != null && expression.Arguments.FirstOrDefault() is MemberExpression)
            {
                propertyName = (expression.Arguments[1] as MemberExpression)?.Member?.Name;
                propertyValue = Expression.Lambda(expression.Arguments.FirstOrDefault()).Compile().DynamicInvoke();
                opr = expression.Method.Name.Equals("Contains") ? "IN" : string.Empty;
                if (propertyName != null && propertyValue != null)
                {
                    queryProperties.Add(new QueryParameter(link, propertyName, propertyValue, opr));
                }
            }

            WalkTree((BinaryExpression)body.Left, body.NodeType, ref queryProperties);
        }
        else
        {
            WalkTree((BinaryExpression)body.Left, body.NodeType, ref queryProperties);
            WalkTree((BinaryExpression)body.Right, body.NodeType, ref queryProperties);
        }
    }

    /// <summary>
    /// Gets the name of the property.
    /// </summary>
    /// <param name="body">body parameter</param>
    /// <returns>name of the property</returns>
    private static string GetPropertyName(BinaryExpression body)
    {
        string propertyName = body.Left.ToString().Split(new char[] { '.' })[1];

        if (body.Left.NodeType == ExpressionType.Convert)
        {
            // hack to remove the trailing ) when convering.
            propertyName = propertyName.Replace(")", string.Empty);
        }

        return propertyName;
    }

    /// <summary>
    /// Gets the operator.
    /// </summary>
    /// <param name="type">type parameter which needs to get operator</param>
    /// <returns>the operator based on type parameter</returns>
    private static string GetOperator(ExpressionType type)
    {
        return type switch
        {
            ExpressionType.Equal => "=",
            ExpressionType.NotEqual => "!=",
            ExpressionType.LessThan => "<",
            ExpressionType.GreaterThan => ">",
            ExpressionType.AndAlso or ExpressionType.And => "AND",
            ExpressionType.Or or ExpressionType.OrElse => "OR",
            ExpressionType.GreaterThanOrEqual => ">=",
            ExpressionType.LessThanOrEqual => "<=",
            ExpressionType.Default => string.Empty,
            _ => string.Empty,
        };
    }
}
