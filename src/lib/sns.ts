import { config } from "dotenv";
config()

import { SNSClient } from '@aws-sdk/client-sns'

export const snsClientInstance = new SNSClient({
    region: "us-east-1",
    endpoint: process.env.ENDPOINT_URL as string, 
})