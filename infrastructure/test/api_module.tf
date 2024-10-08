module "api" {
  source = "../api"
  domain_name = "api.test.planetsaving.uk"
  root_domain = "planetsaving.uk"
  environment = "test"
  project_name = "footprint"
  common_tags = {
    Project = "Planet saving expert test api resource"
  } 
  db_host = var.db_host
}