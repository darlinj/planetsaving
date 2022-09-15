terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket = "terraform-state-store-footprint-web"
    key = "test/terraform-state-store-footprint-web"
    region = "eu-west-2"
  }
}

provider "aws" {
  region = "eu-west-2"
}

provider "aws" {
  alias = "acm_provider"
  region = "us-east-1"
}

module "website" {
  source = "../website"
  domain_name = "planetsaving.uk"
  bucket_name = "test.planetsaving.uk"
  domain_prefix = "test"
  environment = "test"
  cloudfront_aliases = ["test.planetsaving.uk"]
  common_tags = {
    Project = "Planet saving expert test resource"
  } 
}