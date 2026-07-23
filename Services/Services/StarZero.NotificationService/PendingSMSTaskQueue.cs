namespace StarZero.NotificationService;

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Invent.Helper;

/// <summary>
/// Processing queue that contains homogenous commands
/// </summary>
public class PendingSMSTaskQueue
{
    /// <summary>
    ///   The is executing.
    /// </summary>
    private bool isExecuting;

    /// <summary>
    ///   The queue.
    /// </summary>
    private ConcurrentQueue<ISendNotificationCommand> queue;

    private HttpClient httpClient;

    public PendingSMSTaskQueue(HttpClient client)
    {
        this.httpClient = client;
    }

    /// <summary>
    /// Gets Queue.
    /// </summary>
    private ConcurrentQueue<ISendNotificationCommand> Queue
    {
        get
        {
            if (this.queue == null)
            {
                this.queue = new ConcurrentQueue<ISendNotificationCommand>();

                InventLogger.Information("Queue", "PendingSMS Task Queue Created");
            }

            return this.queue;
        }
    }

    /// <summary>
    /// The queue of index commands
    /// </summary>
    /// <param name="indexUpdateCommands">commands to be added to the queue</param>
    public void Enqueue(IEnumerable<ISendNotificationCommand> indexUpdateCommands)
    {
        indexUpdateCommands.ToList().ForEach(item => this.Queue.Enqueue(item));

        InventLogger.Information("Enqueue", string.Format("PendingSMSTask Queue length : {0}", this.Queue.Count));

        this.DequeueAndExecute();
    }

    /// <summary>
    /// remove the command from queue and execute
    /// </summary>
    private void DequeueAndExecute()
    {
        // this is to prevent multiple threads from causing a deadlock
        if (this.isExecuting)
        {
            return;
        }

        if (!this.Queue.TryDequeue(out ISendNotificationCommand command))
        {
            return;
        }

        try
        {
            this.isExecuting = true;

            command.SendSMS(this.httpClient);
            InventLogger.Information("SMS Sent");
        }
        catch (Exception ex)
        {
            InventLogger.Error(ex, "Exception Occurss while sending sms");
        }
        finally
        {
            this.isExecuting = false;

            this.DequeueAndExecute();
        }
    }
}