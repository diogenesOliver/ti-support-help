import { config } from "dotenv";
config()

import { FastifyInstance } from 'fastify'
import { sqsClientInstance } from '../lib/sqs'
import { ReceiveMessageCommand } from '@aws-sdk/client-sqs'
import { deleteSQSMessage } from "../services/delete-message-of-queue";

export const consumerMessage = async (app: FastifyInstance) => {
    app.get('/tickets', async (request, reply) => {

        const command = new ReceiveMessageCommand({
            QueueUrl: process.env.QUEUE_URL,
            MaxNumberOfMessages: 10
        })

        try {
            const data = await sqsClientInstance.send(command)

            data.Messages?.forEach(index => {
                deleteSQSMessage(index.ReceiptHandle)
            })

            if (!data.Messages || data.Messages.length === 0)
                return reply.status(204).send({ message: "Nothing tickets openned" })

            const messages = data.Messages.map((message) => JSON.parse(message.Body as string));
            reply.status(200).send( messages )
        } catch (e) {
            return reply.status(500).send(e)
        }
    })
}
