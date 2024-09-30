resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "MessageSupport"
  billing_mode   = "PROVISIONED"
  hash_key       = "TicketSupport"
  range_key      = "MessageID"

  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "TicketSupport"
    type = "S"
  }

  attribute {
    name = "MessageID"
    type = "S"
  }
}