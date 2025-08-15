import { config } from "dotenv";
config()

import { KafkaInstance } from "../../lib/kafka";
import { sign } from "jsonwebtoken"

export async function generateTokenConsumer(){
    const consumer = KafkaInstance.consumer({ groupId: "generateToken-group" })

    try{
        await consumer.connect()
        await consumer.subscribe({ topic: "topic-test", fromBeginning: true })

        console.info("✅ CONSUMER INSCRITO NO TÓPICO")
        const TOKEN: string = token()

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat }) => {

                console.log({
                    value: message.value?.toString()
                })
                await heartbeat()
            }
        })
    }catch(e){
        console.error(`ERRO - Erro ao consumir as mensagens do Kafka: ${e}`)
    }   
}

function token(): string{
    return sign({ foo: "baar" }, String(process.env.SECRET_KEY_FROM_TOKEN))
}