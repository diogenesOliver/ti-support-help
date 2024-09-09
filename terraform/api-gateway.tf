resource "aws_api_gateway_rest_api" "ti-help-apigtw" {
  name        = "TiHelpDriverAPIGateway"
  description = "This is APIGateway of TiHelpDriver application"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "my_api_resource" {
  rest_api_id = aws_api_gateway_rest_api.ti-help-apigtw.id
  parent_id   = aws_api_gateway_rest_api.ti-help-apigtw.root_resource_id
  path_part   = "ngrok_api_path"
}

resource "aws_api_gateway_method" "my_api_get_method" {
  rest_api_id   = aws_api_gateway_rest_api.ti-help-apigtw.id
  resource_id   = aws_api_gateway_resource.my_api_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "my_api_integration" {
  rest_api_id             = aws_api_gateway_rest_api.ti-help-apigtw.id
  resource_id             = aws_api_gateway_resource.my_api_resource.id
  http_method             = aws_api_gateway_method.my_api_get_method.http_method
  integration_http_method = "GET"
  type                    = "HTTP"
  uri                     = "https://c8d0-200-36-218-146.ngrok-free.app/tickets"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "my_api_response_200" {
  rest_api_id = aws_api_gateway_rest_api.ti-help-apigtw.id
  resource_id = aws_api_gateway_resource.my_api_resource.id
  http_method = aws_api_gateway_method.my_api_get_method.http_method
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "my_api_integration_response_200" {
  rest_api_id = aws_api_gateway_rest_api.ti-help-apigtw.id
  resource_id = aws_api_gateway_resource.my_api_resource.id
  http_method = aws_api_gateway_method.my_api_get_method.http_method
  status_code = aws_api_gateway_method_response.my_api_response_200.status_code
}

resource "aws_api_gateway_deployment" "my_api_deployment" {
  depends_on  = [aws_api_gateway_integration.my_api_integration]
  rest_api_id = aws_api_gateway_rest_api.ti-help-apigtw.id
  stage_name  = "prod"
}

output "api_url" {
  value = "${aws_api_gateway_rest_api.ti-help-apigtw.execution_arn}/prod/localapi"
}