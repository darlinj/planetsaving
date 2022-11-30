module "api" {
  source = "../api"
  domain_name = "api.planetsaving.uk"
  root_domain = "planetsaving.uk"
  environment = "production"
  project_name = "footprint"
  common_tags = {
    Project = "Planet saving expert api resource"
  } 
  db_host = module.database.db_host
}