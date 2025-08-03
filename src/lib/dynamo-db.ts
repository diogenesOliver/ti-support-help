import { config } from "dotenv";
config()

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

export const dynamoDBClientInstance = new DynamoDBClient({
    region: process.env.AWS_REGION as string,
    endpoint: process.env.ENDPOINT_URL as string, 
})