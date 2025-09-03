import { findQuerie } from "../db/queries/find-querie";
import { FastifyInstance } from 'fastify'

export const consumerMessage = async (app: FastifyInstance) => {
    app.get('/tickets/v1', async (request, reply) => {
        try{

            /* 
                Fazer a relação dos tickets criados com usuários que
                criaram e posteriorimente com os colaboradores que 
                foram responsáveis pelo ticket
            */

            const tickets = await findQuerie("ticket")

            reply.status(200).send({
                data: tickets,
                statusCode: 200
            })
        
        }catch(e){
           
            reply.status(404).send({
                message: "[ERROR] - Error 404 on route /tickets/v1",
                statusCode: 404
            })
        
            console.error(`[/tickets/v1] - ${e}`)
        }
    })
}
