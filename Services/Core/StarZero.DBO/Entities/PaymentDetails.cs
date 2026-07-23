using Invent.Helper;

namespace StarZero.DBO;
public class PaymentDetails : EntityBase
{
    public long LoginId { get; set; }

    public long UserPlanId { get; set; }

    public long StatusId { get; set; }

    public string PaymentOrderId { get; set; }

    public string TransactionId { get; set; }

    public decimal Amount { get; set; }

    public string FailedResponse { get; set; }
}
