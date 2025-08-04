import { config } from "dotenv";
config()

import { Domain_Company_Data } from "../domain/ApplicationDomainLayer"

import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function companyRegistration(app: FastifyInstance){
    app.post('/company/registration/v1', async (Request, reply) => {
        const companyDataValidation = z.object(Domain_Company_Data)
    })
}