import { config } from "dotenv";
config()

import { KafkaInstance } from "../../lib/kafka";
import { sign } from "jsonwebtoken"

export async function generateTokenConsumer(uuid?: string){
    const consumer = KafkaInstance.consumer({ groupId: "generateToken-group" })

    try{
        const TOKEN: string = token()
        
        await consumer.connect()
        await consumer.subscribe({ topic: "topic-test", fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat }) => {
                /* 
                    Lógica aplicável para enviar o token para o email da empresa
                */
                
                console.log({
                    message: "Successfully send token from company email",
                    token: TOKEN
                })
                await heartbeat()
            }
        })
    }catch(e){
        console.error(`ERRO - Erro ao consumir as mensagens do Kafka: ${e}`)
    }   
}

function token(): string{
    return sign({
        foo: "baar"
    }, String(process.env.SECRET_KEY_FROM_TOKEN))
}