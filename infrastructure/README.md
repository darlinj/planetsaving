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
