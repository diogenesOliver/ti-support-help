import fastify, { FastifyInstance } from "fastify";
import fastifyExpress from '@fastify/express'
import morgan from 'morgan'
import { urlencoded } from 'body-parser'

import { openSupportTicket } from './services/open-support-ticket'
import { consumerMessage } from './consumer/consumer-sqs-message'
import { uploadLogsFileToS3 } from "./lambda/send-logs-s3";

import { apiLogs } from "./config/morgan-logs";

const app: FastifyInstance = fastify()

app.register(fastifyExpress)
    .after(() => {
        app.use(urlencoded({ extended: true }))
        app.use(morgan('combined', { stream: apiLogs() }))
    })

app.register(openSupportTicket)
app.register(consumerMessage)
app.register(uploadLogsFileToS3)

export = { app }