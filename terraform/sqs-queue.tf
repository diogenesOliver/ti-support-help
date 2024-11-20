resource "aws_sqs_queue" "ti-help-driver-sqs" {
  name                       = "${var.project-name}-sqs"
  delay_seconds              = 15
  max_message_size           = 2048
  message_retention_seconds  = 600
  receive_wait_time_seconds  = 10
  visibility_timeout_seconds = 30

  tags = {
    Environment = "Demo"
  }
}

resource "aws_sqs_queue_policy" "ti-helpDRV-sqs-policy" {
  queue_url = aws_sqs_queue.ti-help-driver-sqs.id

  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Id" : "sqspolicy",
      "Statement" : [
        {
          "Sid" : "001",
          "Effect" : "Allow",
          "Principal" : "*",
          "Action" : "sqs:SendMessage",
          "Resource" : aws_sqs_queue.ti-help-driver-sqs.arn,
          "Condition" : {
            "ArnEquals" : {
              "aws:SourceArn" : aws_sns_topic.ti-help-driver-sns.arn
            }
          }
        }
      ]
    }
  )
}