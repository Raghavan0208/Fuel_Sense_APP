namespace StarZero.NotificationService;

/// <summary>
/// Command will host the actual job
/// </summary>
public interface ISendNotificationCommand
{
    void SendEmail(System.Net.Mail.SmtpClient smtpClient);

    void SendSMS(HttpClient httpClient);
}
