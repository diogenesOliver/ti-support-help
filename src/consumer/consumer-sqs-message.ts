import { config } from "dotenv";
config()

import { FastifyInstance } from 'fastify'
import { getMessages } from "./get-item-command";

export const consumerMessage = async (app: FastifyInstance) => {
    app.get('/tickets', async (request, reply) => {
        const getTicketDataFromDynamoDB = await getMessages()

        if(getTicketDataFromDynamoDB?.length === 0)
            return reply.status(100).send({ message: "Messages not found" })

        return reply.status(200).send( getTicketDataFromDynamoDB )
    })
}
