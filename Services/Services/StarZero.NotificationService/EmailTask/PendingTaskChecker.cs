namespace StarZero.NotificationService;

using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using StarZero.Helper;

public class PendingTaskChecker : ITaskChecker<PendingTask>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;

    public PendingTaskChecker(IOptionsSnapshot<AppConfiguration> _AppConfiguration)
    {
        this.appConfiguration = _AppConfiguration;
    }

    protected IDbConnection Connection
    {
        get
        {
            return new MySqlConnection(this.appConfiguration.Value.DatabaseConfiguration.CoreDBConnectionString);
        }
    }

    public IEnumerable<PendingTask> FetchPendingTasks()
    {
        string pendingEmailTaskQuery = string.Concat(@"SELECT Id, Parms, EmailTo, EmailCC, EmailBCC, EmailFrom, TemplateId, EmailSubject, Template, 
                                                           AdditionalInformation, Attachment, RetryCount FROM vw_pendingemail where RetryCount <=",
                                                     this.appConfiguration.Value.ApplicationConfiguration.RetryCount);
        IEnumerable<PendingTask> tasks = new List<PendingTask>();
        using (IDbConnection cn = this.Connection)
        {
            cn.Open();
            tasks = cn.Query<PendingTask>(pendingEmailTaskQuery);
        }

        return tasks;
    }

    public void MarkTaskAsProcessed(PendingTask task)
    {
        string sendEmailQuery = @"INSERT INTO sentemail ([PendingEmailId],[EmailTemplateId], [EmailSubject], [EmailBody], [ToAddress],
                                      [FromAddress], [Attachment]) VALUES (@{0})";
        using IDbConnection cn = this.Connection;
        var parms = new
        {
            PendingEmailId = task.Id,
            EmailTemplateId = task.TemplateId,
            EmailSubject = task.EmailSubject,
            EmailBody = task.Template,
            ToAddress = task.EmailTo,
            FromAddress = task.EmailFrom,
            Attachment = task.Attachment
        };
        string[] columns = parms.GetType().GetProperties().Select(item => item.Name).ToArray();
        string sentEmailQuery = string.Format(sendEmailQuery, string.Join(",@", columns));

        cn.Open();
        cn.Execute(sentEmailQuery, parms);
        cn.Execute(string.Format("UPDATE pendingemail SET isprocessed = 1 WHERE Id = {0}", task.Id));
    }

    public void UpdateRetryCount(PendingTask task)
    {
        using IDbConnection cn = this.Connection;
        cn.Open();
        cn.Execute(string.Format("UPDATE pendingemail SET retrycount = {1} WHERE Id = {0}", task.Id, ++task.RetryCount));
    }
}
