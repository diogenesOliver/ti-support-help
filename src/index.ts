import fastify, { FastifyInstance } from "fastify";

import { openSupportTicket } from './use_cases/open-support-ticket'
import { consumerMessage } from './use_cases/get-tickets'
import { companyRegistration } from "./use_cases/company-registration";

const app: FastifyInstance = fastify()

app.register(
    import("@fastify/formbody")
)

app.register(openSupportTicket)
app.register(consumerMessage)
app.register(companyRegistration)

export = app