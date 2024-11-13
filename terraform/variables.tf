variable "localstack-endpoint" {
  type    = string
  default = "http://localhost:4566"
}

variable "s3_endpoint" {
  type = string
  default = "http://s3.localhost.localstack.cloud:4566"
}

variable "fake-keys" {
  type    = string
  default = "fake-key-from-localstack"
}

variable "region" {
  type    = list(string)
  default = ["us-east-1"]
}

variable "project-name" {
  type    = string
  default = "ti-help-driver"
}

variable "url-ngrok" {
  type = string
}