data "aws_route53_zone" "main" {
  name = var.root_domain
}

resource "aws_route53_record" "acm_dns_records" {
  for_each = {
    for dvo in aws_acm_certificate.ssl_certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
}

resource "aws_route53_record" "alias_for_api" {
  name    = aws_api_gateway_domain_name.acm_custome_domain.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.main.id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.acm_custome_domain.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.acm_custome_domain.regional_zone_id
  }
}