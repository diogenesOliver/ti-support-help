import { prismaClient } from "../PrismaInstance"

type ArgumentsType = string | undefined

export async function findQuerie(tableName: string, uuidParams?: ArgumentsType, includeValue?: ArgumentsType, secondIncludeValue?: ArgumentsType){
    try{
        if(uuidParams == undefined || includeValue == undefined || secondIncludeValue == undefined){
            const results = await prismaClient[
                tableName
            ].findMany()
            
            return results
        }

        const results = await prismaClient[tableName].findMany({
                where: { id: uuidParams },
                include: {
                    [includeValue]: {
                        include: {
                            [secondIncludeValue]: true
                        }
                    }
                }
            })

        return results
    }catch(e){
        console.error(`[ERROR] - FIND QUERIE ERROR: ${e}`)
        return undefined
    }
}

type TokenValidationResult = {
    querieStatus: boolean;
    message?: {
        companyData: any;
    };
};

export async function findCoorporateTokenFromValidationFeature(tableName: string, token: string): Promise<TokenValidationResult | undefined>{
    try{
        const results = await prismaClient[tableName].findUnique({
            where: { corporate_token: token } 
        })

        if (results == null)
            return { querieStatus: false }

        return {
            querieStatus: true,
            message: {
                companyData: results
            }
        }
    }catch(e){
        console.error(`[ERROR] - FIND UNIQUE TOKEN FROM VALIDATION ERROR: ${e}`)
    }
}