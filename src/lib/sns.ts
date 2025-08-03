import { config } from "dotenv";
config()

import { SNSClient } from '@aws-sdk/client-sns'

export const snsClientInstance = new SNSClient({
    region: process.env.AWS_REGION as string,
    endpoint: process.env.ENDPOINT_URL as string, 
})