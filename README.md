# Running locally

## Install sqlite

```
brew install sqlite
```

## Set up the database locally

```
cd backend
npx sequelize-cli db:migrate
```

## Install the seed data

```
cd backend
npx sequelize-cli db:seed:all
```

# Running the app

## Locally

You can run the front end and backend locally against a sqlite database just running npm start

```
npm start
```

## Against the test database

This runs the front end and backend locally but talks to the remote AWS RDS postgres instance. This uses the settings in test.env to set up the relevant environment variables that point to the test database on AWS.

```
npm run against_test
```

## Set environment variables

If you are running the backend locally or maybe some of the migration commands, it is necessary to set up some local variables. These are all in the test.env or production.env files in the root of the project.

```
export DB_HOST=<URL of the RDS instance>
export AWS_DEFAULT_REGION=<Region that the RDS instance is in>
export AWS_PROFILE=<Your AWS profile referring to ~/aws/credentials if you are not using the default profile>
export NODE_ENV=[test|production]
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
