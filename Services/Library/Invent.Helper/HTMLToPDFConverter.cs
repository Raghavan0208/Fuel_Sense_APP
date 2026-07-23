namespace Invent.Helper;

using System;
using iText.Html2pdf;
using iText.Html2pdf.Resolver.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Font;

public class HTMLToPDFConverter : IDisposable
{
    /// <summary>
    /// Create PDF Document using HTML File
    /// </summary>
    /// <param name="htmlPageContent">HTML File Content</param>
    /// <param name="isSystemFonts">Shall we use System install fonts. Default isSystemFonts is true. Fonts should to within utilityFilesPath Fonts Folder.</param>
    /// <param name="customPageSize">PDF Page Size like A4. Default Page Size is A4.</param>
    /// <param name="utilityFilesPath">if we use CSS or JS file, we need to provide utilityFilesPath Location.</param>
    /// <returns>PDF byte Array Content</returns>
    public byte[] ConvertToPDF(string htmlPageContent, bool isSystemFonts = true, PageSize customPageSize = null,
                                                                                   string utilityFilesPath = null)
    {
        byte[] pdfFileContent = null;
        string localFontsPath = string.Concat(utilityFilesPath, @"\Fonts");
        try
        {
            using MemoryStream memoryStream = new MemoryStream();
            using PdfDocument pdfDocument = new PdfDocument(new PdfWriter(memoryStream));
            PageSize pageSize = customPageSize is null ? PageSize.A4 : customPageSize;
            Document document = new Document(pdfDocument, pageSize);
            ConverterProperties properties = new ConverterProperties();
            FontProvider fontProvider = isSystemFonts ? new DefaultFontProvider(true, true, true) : new DefaultFontProvider();
            if (!isSystemFonts && Directory.Exists(localFontsPath))
            {
                fontProvider.AddDirectory(localFontsPath);
            }
            properties.SetFontProvider(fontProvider);

            if (!string.IsNullOrEmpty(utilityFilesPath))
            {
                properties.SetBaseUri(utilityFilesPath);
            }
            HtmlConverter.ConvertToPdf(htmlPageContent, pdfDocument, properties);

            document.Close();
            pdfDocument.Close();
            memoryStream.Close();
            pdfFileContent = memoryStream.ToArray();

            return pdfFileContent;
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            pdfFileContent = null;
        }
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }
}
