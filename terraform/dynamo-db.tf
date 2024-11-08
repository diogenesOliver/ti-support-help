resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name         = "MessageSupport"
  billing_mode = "PROVISIONED"
  hash_key     = "TicketSupport"

  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "TicketSupport"
    type = "S"
  }
}