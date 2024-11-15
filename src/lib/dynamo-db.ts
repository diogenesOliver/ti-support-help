import { config } from "dotenv";
config()

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

export const dynamoDBClientInstance = new DynamoDBClient({
    region: "us-east-1",
    endpoint: process.env.ENDPOINT_URL as string, 
})