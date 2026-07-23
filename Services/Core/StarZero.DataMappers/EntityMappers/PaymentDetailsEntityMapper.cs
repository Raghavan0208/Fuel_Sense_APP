using AutoMapper;
using System.Reflection.Metadata.Ecma335;

namespace StarZero.DataMappers;
public class PaymentDetailsEntityMapper : ITypeConverter<DBO.PaymentDetails, ViewEntities.PaymentDetails>
{
    public ViewEntities.PaymentDetails Convert(DBO.PaymentDetails source, ViewEntities.PaymentDetails destination, ResolutionContext context)
    {
       var item = new ViewEntities.PaymentDetails();

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
