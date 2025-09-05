import { insertQuerie } from "../db/queries/insert-querie";
import { Domain_Ticket_Data } from "../domain/ApplicationDomainLayer";

import { FastifyInstance } from "fastify";
import { z } from 'zod'

export async function openSupportTicket(app: FastifyInstance) {
    app.post('/open/ticket/v1', async (request, reply) => {
        try{
            const ticketDataValidation = z.object(Domain_Ticket_Data)
            const ticketData = ticketDataValidation.parse(request.body)

            /* 
                Aplicar lógica com infraestrutura AWS e Terraform
                                    OU
                Aplicar lógica com Kafka para enviar os dados para um consumer
            */

            await insertQuerie("ticket", ticketData)

            reply.status(201).send({
                message: "[INFO] - Ticket created successfully",
                statusCode: 201
            })
        }catch(e){
            reply.status(500).send({
                error: "Internal error on server! Try again for a few minutes",
                statusCode: 500
            })

            console.error(`[ROUTE - /open/ticket/v1] - ${e}`)
        }
    })
}