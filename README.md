# Running locally

## Install sqlite

```
brew install sqlite
```

## Set AWS_PROFILE

```
export AWS_PROFILE=joe
```

## Set up the database locally

```
cd backend
npx sequelize-cli db:migrate
```

# Creating the infrastructure

## First create the bucket to store the terraform state in:

```
aws s3 mb s3://terraform-state-store-footprint-web
```

set policy on the bucket

```
aws s3api put-bucket-policy --bucket terraform-state-store-footprint-web --policy file://terraform-state-store-bucket-policy.json
```

## Create a registered domain in Route53

Go [here](https://us-east-1.console.aws.amazon.com/route53/home#DomainListing:)

- Register your domain
- Change the domain_name variable in the providers files in
  - /infrastucture/test/providers.tf
  - /infrastucture/production/providers.tf
  - /common/terraform.tfvars

## Installing the infrastructure

set AWS_PROFILE to match the profile with the credentials for your AWS account. e.g.

```
export AWS_PROFILE=terraform
```

run terraform apply from the directory for the environment you are targeting:

```
# for dev
cd infrastructure/dev
terraform apply

# for test
cd infrastructure/test
terraform apply

# for prod
cd infrastructure/production
terraform apply
```
