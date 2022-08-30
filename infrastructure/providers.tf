terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket = "terraform-state-store-footprint-web"
    key = "prod/terraform-state-store-footprint-web"
    region = "eu-west-2"
  }
}

provider "aws" {
  profile = "terraform"
  region = "eu-west-2"
}

provider "aws" {
  profile = "terraform"
  alias = "acm_provider"
  region = "us-east-1"
}