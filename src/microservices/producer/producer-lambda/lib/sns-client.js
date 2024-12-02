const { SNSClient } = require('@aws-sdk/client-sns')

export const snsClientInstance = new SNSClient({
    region: "us-east-1",
    endpoint: "arn:aws:sns:us-east-1:000000000000:ti-help-driver-sns", 
})