module "api" {
  source = "../api"
  domain_name = "api.test.planetsaving.uk"
  environment = "test"
  project_name = "footprint"
  common_tags = {
    Project = "Planet saving expert test api resource"
  } 
}