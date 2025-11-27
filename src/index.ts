import fastify, { FastifyInstance } from "fastify";

import { openSupportTicket } from './use_cases/open-support-ticket'
import { colaborators } from './use_cases/collaborators'
import { companyRegistration } from "./use_cases/company-registration"
import { associatedCollaborator } from "./use_cases/associate-collaborator"

const app: FastifyInstance = fastify()

app.register(
    import("@fastify/formbody")
)

app.register(openSupportTicket)
app.register(colaborators)
app.register(companyRegistration)
app.register(associatedCollaborator)

export = app