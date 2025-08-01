import { config } from "dotenv"
config()

import app from "."

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3333

const InitServer = async() => {
    try {
        await app.listen({port: SERVER_PORT}).then(res => {
            console.log(`✅ Server is running ${res}`)
        })
    }catch(error){
        console.log(`❌ Failed to initilize server`, error)
        process.exit(1)
    }
}

InitServer()