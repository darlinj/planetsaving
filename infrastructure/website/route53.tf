data "aws_route53_zone" "main" {
  name = var.domain_name
}

resource "aws_route53_record" "root-a" {
  count = var.environment == "production" ? 1 : 0
  zone_id = data.aws_route53_zone.main.zone_id
  name = var.domain_name
  type = "A"

  alias {
    name = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-a" {
  zone_id = data.aws_route53_zone.main.zone_id
  name = "${var.domain_prefix}.${var.domain_name}"
  type = "A"

  alias {
    name = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53domains_registered_domain" "example" {
  domain_name = var.domain_name

  name_server {
    name = "${data.aws_route53_zone.main.name_servers.0}"
  }

  name_server {
    name = "${data.aws_route53_zone.main.name_servers.1}"
  }

  name_server {
    name = "${data.aws_route53_zone.main.name_servers.2}"
  }

  name_server {
    name = "${data.aws_route53_zone.main.name_servers.3}"
  }

  transfer_lock = false

}