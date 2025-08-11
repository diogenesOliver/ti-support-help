import { Kafka } from "kafkajs"

export const KafkaInstance = new Kafka({
    clientId: "ti-support-help",
    brokers: ["localhost:9092"]
})