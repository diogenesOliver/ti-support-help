import fastify, { FastifyInstance } from "fastify";
import fastifyExpress from '@fastify/express'
import { urlencoded } from 'body-parser'

import { openSupportTicket } from './services/open-support-ticket'
import { consumerMessage } from './consumer/consumer-sqs-message'
import { uploadLogsFileToS3 } from "./lambda/send-logs-s3";

import path from "path"

const app: FastifyInstance = fastify()

app.register(fastifyExpress)
    .after(() => {
        app.use(urlencoded({ extended: true }))
    })

app.register(openSupportTicket)
app.register(consumerMessage)
app.register(uploadLogsFileToS3)

export = { app }