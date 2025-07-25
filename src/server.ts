import { config } from "dotenv"
config()

import app from "."

const SERVER_PORT = 3333

const setup = async () => {
    app.listen({ port: SERVER_PORT }).then(res => {
        console.log(`Server running: ${res}`)
    })
}

setup()