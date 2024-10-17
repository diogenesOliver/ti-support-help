resource "aws_cloudwatch_metric_alarm" "tickets-pending" {
  alarm_name          = "SQSVisibleMessagesAlarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"

  period    = "60"
  statistic = "Average"
  threshold = "10"

  alarm_description = "Alarme quando a fila tiver mais de 10 mensagens visíveis"

  dimensions = {
    QueueName = aws_sqs_queue.ti-help-driver-sqs.name
  }
}

resource "aws_sqs_queue" "sqs_alarm_topic" {
  name = "sqs-alarm-topic"
}
