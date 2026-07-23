using AutoMapper;

namespace StarZero.DataMappers;
public class PaymentDetailsModelMapper : ITypeConverter<ViewEntities.PaymentDetails, DBO.PaymentDetails>
{
    public DBO.PaymentDetails Convert(ViewEntities.PaymentDetails source, DBO.PaymentDetails destination, ResolutionContext context)
    {
       var item = new DBO.PaymentDetails();

        item.Id = source?.Id ?? 0;
        item.LoginId = source?.LoginId ?? 0;
        item.UserPlanId = source?.UserPlanId ?? 0;
        item.StatusId = source?.StatusId ?? 0;
        item.PaymentOrderId = source?.PaymentOrderId ?? null;
        item.TransactionId = source?.TransactionId ?? null;
        item.Amount = source?.Amount ?? 0;
        item.FailedResponse = source?.FailedResponse ?? "";
        item.Active = source?.Active ?? false;
        item.Created = source?.Created ?? null;
        item.CreatedBy = source?.CreatedBy ?? 0;
        item.Modified = source?.Created ?? null;
        item.ModifiedBy = source?.ModifiedBy ?? 0;

        return item;    
    }
}
