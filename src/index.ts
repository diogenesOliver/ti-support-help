import fastify, { FastifyInstance } from "fastify";
import fastifyExpress from '@fastify/express'
import { urlencoded } from 'body-parser'

import { openSupportTicket } from './services/open-support-ticket'
import { consumerMessage } from './consumer/consumer-sqs-message'

export const app: FastifyInstance = fastify()

app.register(fastifyExpress)
    .after(() => {
        app.use(urlencoded({ extended: true }))
    })

app.register(openSupportTicket)
app.register(consumerMessage)