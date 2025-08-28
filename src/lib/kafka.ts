import { config } from "dotenv"
config()

import { Kafka } from "kafkajs"

const KAFKA_BROKER_1: string = `${process.env.KAFKA_BROKER_1}:9092`

export const KafkaInstance = new Kafka({
    clientId: "ti-support-help",
    brokers: [
        KAFKA_BROKER_1
    ]
})