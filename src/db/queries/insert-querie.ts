import { prismaClient } from "../PrismaInstance"

type UrlParamIdTyping = string | undefined

interface IArgumentOptions {
    argumentName?: string | undefined,
    paramUrlId?: UrlParamIdTyping
}
export async function insertQuerie(tableName: string, data: object, options?: IArgumentOptions): Promise<object | undefined> {
    try{
        if(!options){
            const result = await prismaClient[tableName].create({
                data: data
            })
            return result
        }

        const { argumentName, paramUrlId } = options

        let relationData

        if(argumentName === 'company' || argumentName === 'companyId'){
            relationData = { company: { connect: { id: paramUrlId } } }
        }else if(argumentName === 'collaborator' || argumentName === 'collaboratorId'){
            relationData = { collaborator: { connect: { id: paramUrlId } } }
        }else{
            //@ts-ignore
            relationData = { [argumentName]: paramUrlId }
        }

        const result = await prismaClient[tableName].create({
            data: {
                ...data,
                ...relationData
            }
        })

        return result
    }catch(e){
        console.error(`[ERROR] - INSERT QUERIE ERROR: ${e}`)
        return undefined
    }
}