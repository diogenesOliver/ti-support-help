resource "aws_api_gateway_rest_api" "ti-help-dirver-gateway" {
  name = "ti-help-dirver-gateway"

  body = <<EOF
{
    openapi = "3.0.1"
    info = {
    title   = "example"
    version = "1.0"
  }
  paths = {
    "/path1" = {
      get = {
        x-amazon-apigateway-integration = {
          httpMethod           = "GET"
          payloadFormatVersion = "1.0"
          type                 = "HTTP_PROXY"
          uri                  = "https://ip-ranges.amazonaws.com/ip-ranges.json"
          }
        }
      }
    }
}
EOF
}