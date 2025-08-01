import fastify, { FastifyInstance } from "fastify";
import { apiLogs } from "./config/morgan-logs";

import { openSupportTicket } from './services/open-support-ticket'
import { consumerMessage } from './consumer/consumer-sqs-message'
import { uploadLogsFileToS3 } from "./lambda/send-logs-s3";


const app: FastifyInstance = fastify({
    logger: true
})

app.register(import("@fastify/formbody"))

app.register(openSupportTicket)
app.register(consumerMessage)
app.register(uploadLogsFileToS3)

export = app