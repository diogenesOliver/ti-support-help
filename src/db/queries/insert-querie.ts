import { PrismaClient } from "@prisma/client"
const prismaClient = new PrismaClient()

export async function insertQuerie(tableName: string, data){
    try{
        await prismaClient[tableName].create({
            data: data
        })

        return data
    }catch(e){
        console.error(`[ERROR] - INSERT QUERIE ERROR: ${e}`)
    }
}