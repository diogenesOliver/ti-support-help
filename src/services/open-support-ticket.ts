import { config } from "dotenv";
config()

import { FastifyInstance } from "fastify";
import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClientInstance } from "../lib/sns";
import { insertTicketOnDataBase } from "./put-message-on-dynamoDB";

import { z } from 'zod'
import { deleteSQSMessage } from "./delete-message-of-queue";

export async function openSupportTicket(app: FastifyInstance) {
    app.post('/open/support/ticket', async (request, reply) => {
        const ticketDataValidation = z.object({
            ticket_code: z.string(),
            ticket_desc: z.string(),
            employeed_email: z.string(),
            employeed_name: z.string(),
            lead: z.string()
        })

        const ticketData = ticketDataValidation.parse(request.body)
        
        const input = {
            TopicArn: process.env.TOPIC_ARN_SNS,
            Message: JSON.stringify(ticketData)
        }

        const command = new PublishCommand(input)
        const messageData = await snsClientInstance.send(command)

        console.log( messageData )

        await insertTicketOnDataBase(JSON.stringify(ticketData))
        await deleteSQSMessage(messageData.MessageId as string)

        reply.status(200).send({
            message: "Succes to send ticket from TI",
            statusCode: 200
        })
    })
}