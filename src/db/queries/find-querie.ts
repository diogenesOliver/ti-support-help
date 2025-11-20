import { prismaClient } from "../PrismaInstance"

type ArgumentsType = string | undefined

export async function findQuerie(tableName: string, uuidParams?: ArgumentsType, includeValue?: ArgumentsType){
    try{
        if(uuidParams == undefined || includeValue == undefined){
            const results = await prismaClient[
                tableName
            ].findMany()
            
            return results
        }

        const results = await prismaClient[tableName].findMany({
                where: { id: uuidParams },
                include: {
                    [includeValue]: true
                }
            })

        return results
    }catch(e){
        console.error(`[ERROR] - FIND QUERIE ERROR: ${e}`)
        return undefined
    }
}