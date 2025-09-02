import { prismaClient } from "../PrismaInstance"

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