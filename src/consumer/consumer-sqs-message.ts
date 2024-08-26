import { FastifyInstance } from 'fastify'
import { sqsClientInstance } from '../lib/sqs'
import { Message, ReceiveMessageCommand } from '@aws-sdk/client-sqs'

export const consumerMessage = async (app: FastifyInstance) => {
    app.get('/tickets', async (request, reply) => {
        const input = {
            QueueUrl: "https://localhost.localstack.cloud:4566/000000000000/ti-help-driver-sqs",
            AttributeNames: ["All" || "Policy" || "VisibilityTimeout" || "MaximumMessageSize" || "MessageRetentionPeriod" || "ApproximateNumberOfMessages" || "ApproximateNumberOfMessagesNotVisible" || "CreatedTimestamp" || "LastModifiedTimestamp" || "QueueArn" || "ApproximateNumberOfMessagesDelayed" || "DelaySeconds" || "ReceiveMessageWaitTimeSeconds" || "RedrivePolicy" || "FifoQueue" || "ContentBasedDeduplication" || "KmsMasterKeyId" || "KmsDataKeyReusePeriodSeconds" || "DeduplicationScope" || "FifoThroughputLimit" || "RedriveAllowPolicy" || "SqsManagedSseEnabled"],
            MessageSystemAttributeNames: ["All" || "SenderId" || "SentTimestamp" || "ApproximateReceiveCount" || "ApproximateFirstReceiveTimestamp" || "SequenceNumber" || "MessageDeduplicationId" || "MessageGroupId" || "AWSTraceHeader" || "DeadLetterQueueSourceArn"],
            MaxNumberOfMessages: 10
        }

        //@ts-ignore
        const command = new ReceiveMessageCommand(input)

        try {
           sqsClientInstance.send(command, (err, data) => {
                if (err)
                    return reply.status(500).send({ message: 'Some error on server' })

                console.log(data)
                reply.status(200).send(data?.Messages) 
            })
        } catch (e) {
            return reply.status(500).send(e)
        } 
    })
}