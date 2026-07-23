namespace Invent.Helper;

using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

public static class GenericHelper
{
    /// <summary>
    /// File Save Extensions Method
    /// </summary>
    /// <param name="fileBytes">file bytes</param>
    /// <param name="absoluteFilePath">file Name</param>
    /// <returns></returns>
    public static bool SaveToPath(this byte[] fileBytes, string absoluteFilePath)
    {
        try
        {
            string directoryPath = Path.GetDirectoryName(absoluteFilePath);
            bool exists = Directory.Exists(directoryPath);
            if (!exists)
            {
                Directory.CreateDirectory(directoryPath);
            }

            File.WriteAllBytes(absoluteFilePath, fileBytes);

            return true;
        }
        catch (Exception)
        {
            throw;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="fileBytes"></param>
    /// <param name="absoluteFilePath"></param>
    /// <returns></returns>
    public static async Task<bool> SaveToPathAsync(this byte[] fileBytes, string absoluteFilePath)
    {
        try
        {
            string directoryPath = Path.GetDirectoryName(absoluteFilePath);
            bool exists = Directory.Exists(directoryPath);
            if (!exists)
            {
                Directory.CreateDirectory(directoryPath);
            }

            await File.WriteAllBytesAsync(absoluteFilePath, fileBytes);

            return true;
        }
        catch (Exception)
        {
            throw;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static string ToTitleCase(this string value)
    {
        return string.IsNullOrEmpty(value) ? value : CultureInfo.CurrentCulture.TextInfo.ToTitleCase(value?.ToLowerInvariant());
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="date"></param>
    /// <returns></returns>
    public static bool IsValidDate(this DateTime? date)
    {
        if (date == null || date.Equals(DateTime.MinValue))
        {
            return false;
        }

        return true;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="date"></param>
    /// <param name="format"></param>
    /// <returns></returns>
    public static string ConvertToCustomFormat(this DateTime? date, string format = "MMM d, yyyy")
    {
        string result = string.Empty;

        if (date.IsValidDate())
        {
            result = date.Value.ToString(format);
        }

        return result;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="textToEncode"></param>
    /// <returns></returns>
    public static string ToBase64Encode(this string textToEncode)
    {
        byte[] plainTextBytes = Encoding.UTF8.GetBytes(textToEncode);
        return Convert.ToBase64String(plainTextBytes);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="element"></param>
    /// <returns></returns>
    public static string RemoveMultipleWhiteSpace(this string element)
    {
        return string.IsNullOrEmpty(element) ? element : Regex.Replace(element, @"\s+", " ");
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="amount"></param>
    /// <returns></returns>
    public static String ConvertAmountIntoWords(this double amount)
    {
        try
        {
            Int64 amount_int = (Int64)amount;
            Int64 amount_dec = (Int64)Math.Round((amount - amount_int) * 100);
            if (amount_dec == 0)
            {
                return ConvertIntToString(amount_int);
            }
            else
            {
                return ConvertIntToString(amount_int) + " Point " + ConvertIntToString(amount_dec);
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    private static String ConvertIntToString(Int64 i)
    {
        String[] units = { "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
        String[] tens = { "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };

        if (i < 20)
        {
            return units[i];
        }
        if (i < 100)
        {
            return tens[i / 10] + ((i % 10 > 0) ? " " + ConvertIntToString(i % 10) : "");
        }
        if (i < 1000)
        {
            return units[i / 100] + " Hundred"
                    + ((i % 100 > 0) ? " And " + ConvertIntToString(i % 100) : "");
        }
        if (i < 100000)
        {
            return ConvertIntToString(i / 1000) + " Thousand "
            + ((i % 1000 > 0) ? " " + ConvertIntToString(i % 1000) : "");
        }
        if (i < 10000000)
        {
            return ConvertIntToString(i / 100000) + " Lakh "
                    + ((i % 100000 > 0) ? " " + ConvertIntToString(i % 100000) : "");
        }
        if (i < 1000000000)
        {
            return ConvertIntToString(i / 10000000) + " Crore "
                    + ((i % 10000000 > 0) ? " " + ConvertIntToString(i % 10000000) : "");
        }
        return ConvertIntToString(i / 1000000000) + " Arab "
                + ((i % 1000000000 > 0) ? " " + ConvertIntToString(i % 1000000000) : "");
    }
}
