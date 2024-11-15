import { config } from "dotenv";
config()

import { SQSClient } from '@aws-sdk/client-sqs'

export const sqsClientInstance = new SQSClient({
    region: "us-east-1",
    endpoint: process.env.ENDPOINT_URL as string, 
})