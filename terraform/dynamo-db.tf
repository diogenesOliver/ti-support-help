resource "aws_dynamodb_table" "tickets-table" {
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

resource "aws_dynamodb_table" "company-table" {
  name         = "Company"
  billing_mode = "PROVISIONED"
  hash_key     = "CompanyRegistred"

  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "CompanyRegistred"
    type = "S"
  } 
}