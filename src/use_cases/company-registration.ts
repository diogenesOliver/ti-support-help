import { config } from "dotenv";
config()

import { Domain_Company_Data } from "../domain/ApplicationDomainLayer"
import { insertQuerie } from "../db/queries/insert-querie";
import { KafkaInstance } from "../lib/kafka";
import { generateTokenConsumer } from "../consumer/kafka_consumer/generate_token_consumer";

import { FastifyInstance } from "fastify";
import { string, z } from "zod"

export async function companyRegistration(app: FastifyInstance){
    app.post('/company/registration/v1', async (request, reply) => {
        const companyDataValidation = z.object(Domain_Company_Data)
        const companyData = companyDataValidation.parse(request.body)

        try {
            const producer = KafkaInstance.producer()
            await producer.connect()

            await producer.send({
                topic: "topic-test",
                messages: [
                    {
                        value: JSON.stringify(companyData.corporate_email as string)
                    }
                ]
            })

            const registrationCoorporate = await insertQuerie("company", companyData)
            if (registrationCoorporate == undefined){
                reply.status(404).send({
                        message: {
                            string: "[ERROR] - Company email or CNPJ already registered",
                            statusCode: 404
                        }
                    })

                return
            }

            await producer.disconnect()
            generateTokenConsumer()

            reply.status(200).send({
                message: {
                    srtingMessage: `Validation TOKEN sended from company email: ${companyData.corporate_email as string}`,
                    status: 200
                }
            })

        }catch(e){
            console.log(`Kafka producer ERROR - ${e}`)
        }
    })
}