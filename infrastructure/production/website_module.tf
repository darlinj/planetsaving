module "website" {
  source = "../website"
  domain_name = "planetsaving.uk"
  bucket_name = "www.planetsaving.uk"
  domain_prefix = "www"
  environment = "production"
  cloudfront_aliases = ["planetsaving.uk"]
  common_tags = {
    Project = "Planet saving expert resource"
  } 
  cloudfront_aliases = ["planetsaving.uk","www.planetsaving.uk"]
}