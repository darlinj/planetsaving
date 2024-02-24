resource "aws_iam_role" "lambda_role" {
name   = "${var.project_name}_lambda_role_${var.environment}"
assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "lambda.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}
resource "aws_iam_policy" "iam_policy_for_lambda" {
 
 name         = "${var.project_name}_lambda_iam_policy_${var.environment}"
 path         = "/"
 description  = "AWS IAM Policy for managing aws lambda role"
 policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": [
       "logs:CreateLogGroup",
       "logs:CreateLogStream",
       "logs:PutLogEvents"
     ],
     "Resource": "arn:aws:logs:*:*:*",
     "Effect": "Allow"
   },
   {
       "Effect": "Allow",
       "Action": [
           "dynamodb:GetItem",
           "dynamodb:Scan",
           "dynamodb:Query",
           "dynamodb:GetRecords"
       ],
       "Resource": "*"
   },
   {
       "Effect": "Allow",
       "Action": [
           "rds-db:connect"
       ],
       "Resource": "*"
   }
 ]
}
EOF
}
 
resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
 role        = aws_iam_role.lambda_role.name
 policy_arn  = aws_iam_policy.iam_policy_for_lambda.arn
}
 
data "archive_file" "zip_the_apollo_server_code" {
type        = "zip"
source_dir  = "${path.module}/../../backend/"
output_path = "${path.module}/apollo-server.zip"
}
 
resource "aws_lambda_function" "terraform_lambda_func" {
filename                       = data.archive_file.zip_the_apollo_server_code.output_path
function_name                  = "${var.project_name}_apollo_server_${var.environment}"
role                           = aws_iam_role.lambda_role.arn
handler                        = "graphql.graphqlHandler"
runtime                        = "nodejs14.x"
timeout                        = 5
source_code_hash               = data.archive_file.zip_the_apollo_server_code.output_base64sha256
depends_on                     = [aws_iam_role_policy_attachment.attach_iam_policy_to_iam_role]
environment {
  variables = {
    NODE_ENV = var.environment
    DB_HOST = var.db_host
  }
}
}