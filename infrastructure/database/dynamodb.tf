resource "aws_dynamodb_table" "climate_data_table" {
  name           = "climateDataTable_${var.environment}"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key       = "id"

  attribute {
    name = "id"
    type = "N"
  }

  tags = var.common_tags
}

resource "aws_dynamodb_table" "actions_table" {
  name           = "actionsTable_${var.environment}"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key       = "id"

  attribute {
    name = "id"
    type = "N"
  }

  tags = var.common_tags
}