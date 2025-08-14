import { config } from "dotenv";
config()

import { Domain_Company_Data } from "../domain/ApplicationDomainLayer"
import { saveOnDataBaseInstance } from "../db/SaveOnDataBaseInstance";
import { KafkaInstance } from "../lib/kafka";
import { generateTokenConsumer } from "../consumer/kafka_consumer/generate_token_consumer";

import { FastifyInstance } from "fastify";
import { z } from "zod"

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
                        value: JSON.stringify(companyData) as string
                    }
                ]
            })

            await producer.disconnect()

            generateTokenConsumer()
        }catch(e){
            console.log(`Kafka producer ERROR - ${e}`)
        }
    })
}