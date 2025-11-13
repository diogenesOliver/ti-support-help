import { prismaClient } from "../PrismaInstance"

type ArgumentsType = string | undefined

export async function findQuerie(tableName: string, uuidParams?: ArgumentsType){
    try{
        if(uuidParams == undefined){
            const results = await prismaClient[
                tableName
            ].findMany()
            
            return results
        }

        const results = await prismaClient[tableName].findMany({
                where: { id: uuidParams }
            })

        return results
    }catch(e){
        console.error(`[ERROR] - FIND QUERIE ERROR: ${e}`)
        return undefined
    }
}