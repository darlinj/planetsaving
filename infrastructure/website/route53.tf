resource "aws_route53_zone" "main" {
  name = var.domain_name
  tags = var.common_tags
}

resource "aws_route53_record" "dev-ns" {
  zone_id = aws_route53_zone.main.zone_id
  allow_overwrite = true
  name = var.domain_name
  type    = "NS"
  ttl     = "172800"
  records = var.name_servers_for_hosted_domain
}

resource "aws_route53_record" "root-a" {
  zone_id = aws_route53_zone.main.zone_id
  name = var.domain_name
  type = "A"

  alias {
    name = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-a" {
  zone_id = aws_route53_zone.main.zone_id
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
    name = "${aws_route53_zone.main.name_servers.0}"
  }

  name_server {
    name = "${aws_route53_zone.main.name_servers.1}"
  }

  name_server {
    name = "${aws_route53_zone.main.name_servers.2}"
  }

  name_server {
    name = "${aws_route53_zone.main.name_servers.3}"
  }

  transfer_lock = false

}