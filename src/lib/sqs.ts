import { SQSClient } from '@aws-sdk/client-sqs'

export const sqsClientInstance = new SQSClient({
    region: "us-east-1",
    endpoint: "http://localhost:4566", 
})