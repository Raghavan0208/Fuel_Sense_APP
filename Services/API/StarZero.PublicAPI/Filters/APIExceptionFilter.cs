namespace StarZero.API.Filters;

public class APIExceptionFilter : ExceptionFilterAttribute
{
    public APIExceptionFilter()
    {

    }

    public override void OnException(ExceptionContext context)
    {
        InventLogger.Error(context.Exception, "Internal Server Error Occur.");
        base.OnException(context);
    }
}
