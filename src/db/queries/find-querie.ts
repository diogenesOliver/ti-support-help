import { prismaClient } from "../PrismaInstance"

export async function findQuerie(tableName: string, paramInclude?: string | undefined){
    try{
        if(paramInclude == undefined){
            const results = await prismaClient[
                tableName
            ].findMany()
            
            return results
        }

        const results = await prismaClient[tableName].findMany({
                include: {
                    paramInclude
                }
            })

        return results
    }catch(e){
        console.error(`[ERROR] - FIND QUERIE ERROR: ${e}`)
    }
}