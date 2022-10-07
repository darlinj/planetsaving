terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket = "terraform-state-store-footprint-web"
    key = "dev/terraform-state-store-footprint-web"
    region = "eu-west-2"
  }
}

provider "aws" {
  region = "eu-west-2"
}

module "database" {
  source = "../database"
  environment = "dev"
  common_tags = {
    Project = "Planet saving expert dev resource"
  } 
}