provider "aws" {
  access_key                  = var.fake-keys
  secret_key                  = var.fake-keys
  region                      = var.region[0]
  s3_use_path_style           = false
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    sqs        = var.localstack-endpoint
    cloudwatch = var.localstack-endpoint
    iam        = var.localstack-endpoint
    sns        = var.localstack-endpoint
    apigateway = var.localstack-endpoint
    dynamodb   = var.localstack-endpoint
    s3         = var.localstack-endpoint
  }
}