resource "aws_route53_zone" "main" {
  name = var.domain_name
  tags = var.common_tags
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