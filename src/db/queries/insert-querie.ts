import { prismaClient } from "../PrismaInstance"

type UrlParamIdTyping = string | undefined

export async function insertQuerie(tableName: string, data: object, argumentName?: string, paramUrlId?: UrlParamIdTyping): Promise<object | undefined> {
    try{
        if(paramUrlId == undefined || argumentName == undefined){
            await prismaClient[tableName].create({
                data: data
            })
            return data
        }

        let relationData

        if(argumentName === 'company' || argumentName === 'companyId'){
            relationData = { company: { connect: { id: paramUrlId } } }
        }else if(argumentName === 'collaborator' || argumentName === 'collaboratorId'){
            relationData = { collaborator: { connect: { id: paramUrlId } } }
        }else{
            relationData = { [argumentName]: paramUrlId }
        }

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