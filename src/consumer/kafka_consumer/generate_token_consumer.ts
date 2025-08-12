import { KafkaInstance } from "../../lib/kafka";

async function generateTokenConsumer(){
    const consumer = KafkaInstance.consumer({ groupId: "generateToken-group" })

    try{
        await consumer.connect()
        await consumer.subscribe({ topic: "topic-test", fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    value: message.value?.toString()
                })
            }
        })

        console.log("MENSAGEM CONSUMIDA COM SUCESSO")

    }catch(e){

    }   
}

generateTokenConsumer()