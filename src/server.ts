import { config } from "dotenv"
config()

import { Client } from "pg"
import app from "."

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3333

const TestDataBaseConnection = async() => {
    const client = new Client({
        database: "postgres",
        user: process.env.POSTGRES_USER as string,
        password: process.env.POSTGRES_PASSWORD as string,
        port: process.env.DATABASE_PORTS_POSTGRES as number | undefined
    })

    try{
        console.log("Testing database connection...")
        await client.connect()

        console.log(`✅ Succesfully to connect database`)

        return true
    }catch(e){
        console.error(`❌ [ERROR] - Error to connect on Database: ${e}`)
    }finally{ client.end() }
}

const InitServer = async() => {
    try {

        if(!await TestDataBaseConnection())
            return

        await app.listen({port: SERVER_PORT}).then(res => {
            console.log(`✅ Server is running ${res}`)
        })
    }catch(error){
        console.log(`❌ Failed to initilize server`, error)
        process.exit(1)
    }
}

InitServer()