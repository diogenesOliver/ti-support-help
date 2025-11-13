import { prismaClient } from "../PrismaInstance"

type UrlParamIdTyping = string | undefined

export async function insertQuerie(tableName: string, data: object, argumentName: string, paramUrlId?: UrlParamIdTyping): Promise<object | undefined> {
    try{
        if(paramUrlId == undefined){
            await prismaClient[tableName].create({
                data: data
            })
            return data
        }

        const relationData = argumentName === 'company' || argumentName === 'companyId' 
            ? { company: { connect: { id: paramUrlId } } }
            : { [argumentName]: paramUrlId }

        await prismaClient[tableName].create({
            data: {
                ...data,
                ...relationData
            }
        })

        return data
    }catch(e){
        console.error(`[ERROR] - INSERT QUERIE ERROR: ${e}`)
        return undefined
    }
}