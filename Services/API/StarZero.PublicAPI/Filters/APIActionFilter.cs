namespace StarZero.API.Filters;

public class APIActionFilter : ActionFilterAttribute
{
    public APIActionFilter()
    {

    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        InventLogger.Information(string.Concat("Action Executing EndPoint ", context.ActionDescriptor.DisplayName));
        base.OnActionExecuting(context);
    }
}
