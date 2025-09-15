import { prismaClient } from "../PrismaInstance"

type ArgumentsType = string | undefined

export async function findQuerie(tableName: string, primaryArgument?: ArgumentsType, secondArgument?: ArgumentsType){
    try{
        if(primaryArgument == undefined || secondArgument == undefined){
            const results = await prismaClient[
                tableName
            ].findMany()
            
            return results
        }

        const results = await prismaClient[tableName].findMany({
                include: {
                    primaryArgument,
                    secondArgument
                }
            })

        return results
    }catch(e){
        console.error(`[ERROR] - FIND QUERIE ERROR: ${e}`)
    }
}