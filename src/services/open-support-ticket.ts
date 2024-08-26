import { FastifyInstance } from "fastify";
import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClientInstance } from "../lib/sns";
import { TicketCode } from "../mock/ticket-code";
import { z } from 'zod'

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
            TopicArn: "arn:aws:sns:us-east-1:000000000000:ti-help-driver-sns",
            Message: JSON.stringify(ticketData)
        }

        const command = new PublishCommand(input)
        await snsClientInstance.send(command)

        reply.status(200).send({
            message: "Succes to send ticket from TI",
            statusCode: 200
        })
    })
}