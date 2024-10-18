resource "aws_api_gateway_rest_api" "tickets-apigtw" {
  body = jsonencode({
    openapi = "3.0.1"
    info = {
      title   = "ti-help-driver-application"
      version = "1.0"
    }
    paths = {
      "/path1" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "GET"
            payloadFormatVersion = "1.0"
            type                 = "HTTP_PROXY"
            uri                  = "${var.url-ngrok}"
          }
        }
      }
    }
  })

  name = "ti-help-driver-application"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "ngrok-deployment" {
  rest_api_id = aws_api_gateway_rest_api.tickets-apigtw.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.tickets-apigtw.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "ngrok-staging" {
  deployment_id = aws_api_gateway_deployment.ngrok-deployment.id
  rest_api_id   = aws_api_gateway_rest_api.tickets-apigtw.id
  stage_name    = "ngrok-stage"
}