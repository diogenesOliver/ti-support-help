import { config } from "dotenv";
config()

import { FastifyInstance } from 'fastify'
import { sqsClientInstance } from '../lib/sqs'
import { ReceiveMessageCommand } from '@aws-sdk/client-sqs'

export const consumerMessage = async (app: FastifyInstance) => {
    app.get('/tickets', async (request, reply) => {

        const command = new ReceiveMessageCommand({
            QueueUrl: process.env.QUEUE_URL,
            MaxNumberOfMessages: 10
        })

        try {
            const data = await sqsClientInstance.send(command)

            if (!data.Messages || data.Messages.length === 0)
                return reply.status(204).send({ message: "Nothing tickets openned" })

            const bodyArray: void = data.Messages.forEach(async index => {
                console.log( JSON.parse( index.Body as string ) )
            })
        } catch (e) {
            return reply.status(500).send(e)
        }
    })
}
