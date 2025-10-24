import { Domain_Collaborator_Data } from "../domain/ApplicationDomainLayer"
import { insertQuerie } from "../db/queries/insert-querie"

import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function associatedCollaborator(app: FastifyInstance){
    app.post("/associate/collaborator/:id/v1", async (request, reply) => {
        try{
            const collaboratorDataValidation = z.object(Domain_Collaborator_Data)
            const collaboratorData = collaboratorDataValidation.parse(request.body)
            
            //@ts-ignore
            const paramsValidation = z.object({ id: z.string().uuid() }) 
            const { id } = paramsValidation.parse(request.params)
            
            await insertQuerie("collaborator", collaboratorData, id)

            reply.status(201).send({
                message: "Assigned collaborator succesfully",
                statusCode: 201
            })

        }catch(e){
            if( JSON.parse( e.message )[0].code == "invalid_string" ){
                reply.status(400).send({
                    error: `Invlaid <<paramId>>! Try again`,
                    statusCode: 400
                })
            
                return
            }

            reply.status(500).send({
                error: `Internal error on server! Try again for a few minutes`,
                statusCode: 500
            })

            console.log(`[ROUTE - /associate/collaborator/:id/v1] - ${e}`)
        }
    })
}
