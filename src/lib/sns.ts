import { SNSClient } from '@aws-sdk/client-sns'

export const snsClientInstance = new SNSClient({
    region: "us-east-1",
    endpoint: "http://localhost:4566", 
})