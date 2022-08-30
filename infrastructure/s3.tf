# S3 bucket for website.
resource "aws_s3_bucket" "www_bucket" {
  bucket = "www.${var.bucket_name}"
  tags = var.common_tags
}
data "aws_s3_bucket" "content_bucket" {
  bucket = aws_s3_bucket.www_bucket.bucket
}
resource "aws_s3_bucket_acl" "bucket-acl" {
  bucket = data.aws_s3_bucket.content_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_cors_configuration" "example" {
  bucket = data.aws_s3_bucket.content_bucket.bucket
cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["https://www.${var.domain_name}"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "bucket-policy" {
  bucket = data.aws_s3_bucket.content_bucket.id
  policy = templatefile("templates/s3-policy.json", { bucket = "www.${var.bucket_name}" })
}

resource "aws_s3_bucket_website_configuration" "website-config" {
  bucket = data.aws_s3_bucket.content_bucket.bucket
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "404.jpeg"
  }
}

resource "aws_s3_bucket" "root_bucket" {
  bucket = var.bucket_name
  tags = var.common_tags
}

data "aws_s3_bucket" "redirect_bucket" {
  bucket = aws_s3_bucket.root_bucket.bucket
}
resource "aws_s3_bucket_acl" "redirect-bucket-acl" {
  bucket = data.aws_s3_bucket.redirect_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "redirect-bucket-policy" {
  bucket = data.aws_s3_bucket.redirect_bucket.id
  policy = templatefile("templates/s3-policy.json", { bucket = var.bucket_name })
}

resource "aws_s3_bucket_website_configuration" "redirect-bucket-website-config" {
  bucket = data.aws_s3_bucket.redirect_bucket.id
  redirect_all_requests_to {
    host_name = "https://www.${var.domain_name}"
  }
}