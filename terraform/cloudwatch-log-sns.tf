resource "aws_cloudwatch_metric_alarm" "tickets-opened" {
  alarm_name          = "number-of-tickets-opened"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  namespace           = "AWS/SNS"

  threshold          = "10"
  evaluation_periods = "2"
  period             = "60"

  dimensions = {
    TopicName = aws_sns_topic.ti-help-driver-sns.arn
  }
}