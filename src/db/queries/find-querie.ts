import { prismaClient } from "../PrismaInstance"

export async function findQuerie(tableName: string){
    try{
        const results = await prismaClient[
            tableName
        ].findMany()
        
        return results
    }catch(e){
        console.error(`[ERROR] - FIND QUERIE ERROR: ${e}`)
    }
}