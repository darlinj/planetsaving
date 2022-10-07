resource "aws_dynamodb_table" "climate_data_table" {
  name           = "climateData-${var.environment}"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key       = "id"
  range_key      = "label"

  attribute {
    name = "id"
    type = "N"
  }

  attribute {
    name = "label"
    type = "S"
  }

  tags = var.common_tags
}