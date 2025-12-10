import { FastifyInstance } from "fastify"

export const tokenValidate = async (app: FastifyInstance) => {
    app.post('/token/validation', async (request, reply) => {
        try{
            const token = request.body

        }catch(e){
            console.log(`[ROUTE - /token/validation] - ${e}`)
        }
    })
}