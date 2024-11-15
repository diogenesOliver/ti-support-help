import { config } from "dotenv";
config()

import { S3Client } from "@aws-sdk/client-s3";

export const bucketS3Instance = new S3Client({
    region: "us-east-1",
    endpoint: process.env.S3_ENDPOINT_URL as string
})