# Connecting to RDS database

Download the cert bundle for London from here https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html

You are looking for eu-west-2-bundle.pem

set RDSHOST and PGPASSWORD to the right values

```
export RDSHOST=footprint-test.c0u40heuqthr.eu-west-2.rds.amazonaws.com
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

Create a login token for the user using AWS CLI:

```
export PGPASSWORD="$(aws rds generate-db-auth-token --hostname $RDSHOST --port 5432 --region eu-west-2 --username db_user --profile joe)"
```

Log in with AWS IAM auth

```
psql -h ${RDSHOST} "user=db_user port=5432 dbname=postgres sslmode=verify-full sslrootcert=/Users/jd5/Downloads/eu-west-2-bundle.pem"
```
