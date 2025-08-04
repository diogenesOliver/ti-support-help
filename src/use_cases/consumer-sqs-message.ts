import { config } from "dotenv";
config()

import { getMessages } from "../consumer/get-item-command";
import { listDeadLetterSourceQueues } from "../consumer/list-ddl- queue";

import { FastifyInstance } from 'fastify'

export const consumerMessage = async (app: FastifyInstance) => {
    app.get('/tickets/v1', async (request, reply) => {
        const getTicketDataFromDynamoDB = await getMessages()

        if (getTicketDataFromDynamoDB?.length === 0)
            return reply.status(100).send({ message: "Messages not found" })

        const sqsDDL = (await listDeadLetterSourceQueues()).queueUrls
        
        if (sqsDDL === undefined)
            return reply.status(101).send({ message: "Property is undefined" })

        if (sqsDDL?.length > 0)
            return reply.status(101).send({ message: "message problem", info: sqsDDL })

        return reply.status(200).send(getTicketDataFromDynamoDB)
    })
}
