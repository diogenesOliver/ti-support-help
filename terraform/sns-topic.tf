resource "aws_sns_topic" "ti-help-driver-sns" {
  name = "${var.project-name}-sns"
}

resource "aws_sns_topic_subscription" "trigger-sns-subscription" {
  topic_arn = aws_sns_topic.ti-help-driver-sns.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.ti-help-driver-sqs.arn
}