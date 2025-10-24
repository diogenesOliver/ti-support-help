import { prismaClient } from "../PrismaInstance"

type UrlParamIdTyping = string | undefined

export async function insertQuerie(tableName: string, data: object, paramUrlId?: UrlParamIdTyping): Promise<object | undefined> {
    try{
        if(paramUrlId == undefined){
            await prismaClient[tableName].create({
                data: data
            })
            return data
        }

        await prismaClient[tableName].create({
            data: { ...data }
        })

        return data
    }catch(e){
        console.error(`[ERROR] - INSERT QUERIE ERROR: ${e}`)
    }
}