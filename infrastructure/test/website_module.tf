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