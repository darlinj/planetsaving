data "aws_availability_zones" "available" {}

data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "rds" {
  name       = "footprint-rds"
  vpc_id = "${data.aws_vpc.default.id}"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.common_tags
}

resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}


resource "aws_db_instance" "footprint" {
  identifier                          = "footprint"
  instance_class                      = "db.t3.micro"
  allocated_storage                   = 5
  engine                              = "postgres"
  username                            = "db_user"
  password                            = random_password.password.result
  vpc_security_group_ids              = [aws_security_group.rds.id]
  publicly_accessible                 = true
  skip_final_snapshot                 = true
  iam_database_authentication_enabled = true
}

resource "local_file" "database_env" {
    content = <<EOF
DB_HOST=${aws_db_instance.footprint.address}
TF_VAR_db_host=${aws_db_instance.footprint.address}
PGPASSWORD="${aws_db_instance.footprint.password}"
        EOF
    filename = "database.env"
}

output "db_host" {
  value = aws_db_instance.footprint.address
}