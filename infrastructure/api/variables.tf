variable "environment" {
  type = string
  description = "The environment that this is deploying to."
}

variable "domain_name" {
  type = string
  description = "The domain name for the api."
}

variable "root_domain" {
  type = string
  description = "The root domain name that the API will be under."
}

variable "project_name" {
  type = string
  description = "name of the project"
}

variable "common_tags" {
  description = "Common tags you want applied to all components."
}

variable "db_host" {
  description = "URI for the database instance"
}
