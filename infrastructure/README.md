# Creating the infrastructure

## First create the bucket to store the terraform state in:

```
aws s3 mb s3://terraform-state-store-footprint-web
```

set policy on the bucket

```
aws s3api put-bucket-policy --bucket terraform-state-store-footprint-web --policy file://terraform-state-store-bucket-policy.json
```
