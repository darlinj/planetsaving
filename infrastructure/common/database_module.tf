module "database" {
  source = "../database"
  common_tags = {
    Project = "Planet saving expert test api resource"
  } 
}