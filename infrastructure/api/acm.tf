# SSL Certificate
resource "aws_acm_certificate" "ssl_certificate" {
  domain_name = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method = "DNS"

  tags = var.common_tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn = aws_acm_certificate.ssl_certificate.arn
}

resource "aws_api_gateway_domain_name" "acm_custome_domain" {
  domain_name              = var.domain_name
  regional_certificate_arn = aws_acm_certificate_validation.cert_validation.certificate_arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}
