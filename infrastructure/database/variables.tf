variable "environment" {
  type = string
  description = "The environment that this is deploying to."
}

variable "common_tags" {
  description = "Common tags you want applied to all components."
}

variable "db_password" {
  description = "Password for RDS"
}