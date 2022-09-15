terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket = "terraform-state-store-footprint-web"
    key = "production/terraform-state-store-footprint-web"
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
  bucket_name = "www.planetsaving.uk"
  domain_prefix = "www"
  environment = "production"
  common_tags = {
    Project = "Planet saving expert resource"
  } 
  cloudfront_aliases = ["planetsaving.uk","www.planetsaving.uk"]
}