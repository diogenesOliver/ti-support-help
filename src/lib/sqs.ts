import { config } from "dotenv";
config()

import { SQSClient } from '@aws-sdk/client-sqs'

export const sqsClientInstance = new SQSClient({
    region: process.env.AWS_REGION as string,
    endpoint: process.env.ENDPOINT_URL as string, 
})