resource "aws_iam_role" "lambda_role" {
name   = "Apollo_Server_Lambda_Function_Role"
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
 
 name         = "aws_iam_policy_for_terraform_aws_lambda_role"
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
source_dir  = "${path.module}/api/"
output_path = "${path.module}/apollo-server.zip"
}
 
resource "aws_lambda_function" "terraform_lambda_func" {
filename                       = data.archive_file.zip_the_apollo_server_code.output_path
function_name                  = "Apollo_Server"
role                           = aws_iam_role.lambda_role.arn
handler                        = "graphql.graphqlHandler"
runtime                        = "nodejs14.x"
#source_code_hash               = "${base64sha256(filebase64("${path.module}/apollo-server.zip"))}"
source_code_hash               = data.archive_file.zip_the_apollo_server_code.output_base64sha256
depends_on                     = [aws_iam_role_policy_attachment.attach_iam_policy_to_iam_role]
}