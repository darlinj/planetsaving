module "database" {
  source = "../database"
  environment = "test"
  common_tags = {
    Project = "Planet saving expert test api resource"
  } 
}