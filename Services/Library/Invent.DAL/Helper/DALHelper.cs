namespace Invent.DAL.Helper;

using System.Reflection;

internal static class DALHelper
{
    internal static Type GetEntityType<T>()
    {
        Type myType = typeof(T);
        var objectType = Type.GetType(myType.ToString());
        if (objectType == null)
        {
            objectType = typeof(T);
        }

        return objectType;
    }

    internal static string GetValidSelectColumns<T>(this string tableName)
    {
        Type objectType = GetEntityType<T>();
        if (objectType != null)
        {
            var validProps = objectType.GetProperties().Where(s => s != null
                            && s.CustomAttributes.Count(ca => ca.AttributeType.Equals(typeof(DBIgnoreAttribute))) == 0).ToArray();

            if (validProps != null && validProps.Count() > 0)
            {
                return string.Concat(string.Join(", ", validProps.Select(prop => prop.Name)));
            }
        }

        // when it has no entity present in the DBO object.
        return " * ";
    }

    internal static PropertyInfo[] GetValidTableColumns(this PropertyInfo[] props)
    {
        var validProps = props.Where(s => !s.Name.Equals("Id")
                        && s.CustomAttributes.Count(ca => ca.AttributeType.Equals(typeof(DBIgnoreAttribute))) == 0).ToArray();
        return validProps;
    }
}
