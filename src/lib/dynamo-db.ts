import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

export const dynamoDBClientInstance = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://localhost:4566", 
})