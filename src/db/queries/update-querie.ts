import { prismaClient } from "../PrismaInstance";

export async function updateQuerie(tableName: string, uuidUser: string, fieldUpdate: string, token: string){
    try{
        const existingRecord = await (prismaClient as any)[tableName].findUnique({
            where: { id: uuidUser }
        });

        if (!existingRecord) {
            console.error(`Record with id ${uuidUser} not found in ${tableName}`);
            return undefined;
        }

        const result = await (prismaClient as any)[tableName].update({
            where: { id: uuidUser },
            data: {
                [fieldUpdate]: token
            }
        });
        
        return result;
    }catch(e){
        console.error(`[ERROR] - UPDATE QUERIE ERROR: ${e}`);
        return undefined;
    }
}