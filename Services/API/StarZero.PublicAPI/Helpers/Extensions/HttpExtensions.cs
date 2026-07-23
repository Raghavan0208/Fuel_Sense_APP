namespace StarZero.API.Helpers;

using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

public static class HttpExtensions
{
    public static HttpResponseMessage SendByteArrayAsAttachment(this byte[] byteContent, string fileName)
    {
        if (byteContent == null || byteContent.Length == 0)
        {
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
        response.Content = new ByteArrayContent(byteContent);
        response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
        response.Content.Headers.ContentDisposition.FileName = fileName;

        return response;
    }
}
