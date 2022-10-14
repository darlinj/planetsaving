module "database" {
  source = "../database"
  environment = "production"
  common_tags = {
    Project = "Planet saving expert database resource"
  } 
}