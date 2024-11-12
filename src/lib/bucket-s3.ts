import { S3Client } from "@aws-sdk/client-s3";

export const bucketS3Instance = new S3Client({
    region: "us-east-1",
    endpoint: "http://s3.localhost.localstack.cloud:4566"
})