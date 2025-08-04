import { config } from "dotenv";
config()

import { snsClientInstance } from "../lib/sns";
import { insertTicketOnDataBase } from "../services/put-message-on-dynamoDB";
import { Domain_Ticket_Data } from "../domain/ApplicationDomainLayer";

import { FastifyInstance } from "fastify";
import { PublishCommand } from '@aws-sdk/client-sns'
import { z } from 'zod'

export async function openSupportTicket(app: FastifyInstance) {
    app.post('/open/ticket/v1', async (request, reply) => {
        const ticketDataValidation = z.object(Domain_Ticket_Data)

        const ticketData = ticketDataValidation.parse(request.body)
        
        const input = {
            TopicArn: process.env.TOPIC_ARN_SNS,
            Message: JSON.stringify(ticketData)
        }

        const command = new PublishCommand(input)
        await snsClientInstance.send(command)

        await insertTicketOnDataBase(JSON.stringify(ticketData))

        reply.status(200).send({
            message: "Succes to send ticket from TI",
            statusCode: 200
        })
    })
}