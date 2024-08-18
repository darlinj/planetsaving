# Running locally

## Install sqlite

```
brew install sqlite
```

## Set up the database locally

```
cd backend
npm install
npx sequelize-cli db:migrate
```

## Set up the front end

```
cd frontend
npx install
```

## Run the app and setup static data

You can run the front end and backend locally against a sqlite database just running npm start

From the root of the project

```
npm install
npm start
```

## Set up static data

```
export API_URL=http://localhost:4000
npx ts-node ./data/reset_database.ts
```

# Against the test database

This runs the front end and backend locally but talks to the remote AWS RDS postgres instance. This uses the settings in pg.env to set up the relevant environment variables that point to the test database on AWS.

```
export NODE_ENV=test
npm run against_test
```

## Set environment variables

If you are running the backend locally or maybe some of the migration commands, it is necessary to set up some local variables. These are all in the db.env in the root of the project.

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

# Running e2e tests locally on docker

```
docker run -it --rm --name e2etests -v ${PWD}:/app --entrypoint "" testcafe/testcafe:2.0.2 sh
```

# Running Sequelize commands in a REPL

```
npm -g install sequelize-tinker
sequelize-tinker
```

then require your models and off you go

# Connecting to RDS database for the first time

Download the cert bundle for London from here https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html

You are looking for eu-west-2-bundle.pem

set RDSHOST and PGPASSWORD to the right values

```
export RDSHOST=footprint-test.something.eu-west-2.rds.amazonaws.com
export PGPASSWORD=postgres
```

Log in

```
psql -h ${RDSHOST} "user=db_user port=5432 dbname=postgres sslmode=verify-full sslrootcert=/Users/jd5/Downloads/eu-west-2-bundle.pem"
```

enable rds_iam for the user from inside postgres

```
GRANT rds_iam TO db_user;
```

Log out of postgres (\q)

Copy the pg.env.example to pg.env and set the RDS_HOST to the URL of the RDS host.

# Normal login with AWS IAM auth

```
export NODE_ENV=test
source pg.env
psql -h ${RDSHOST} "user=db_user port=5432 dbname=postgres sslmode=verify-full sslrootcert=/Users/jd5/code/footprint/backend/config/eu-west-2-bundle.pem"
```

# To reset the database

set the URL of the environment you are trying to hit **export API_URL=http://blah** then:

```
npx ts-node ./data/reset_database.ts
```

# Update dependencies

```
npx npm-check-updates
```

then

```
npx npm-check-updates  -u
npm install
```
