import { PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketS3Instance } from "../lib/bucket-s3";

import fs from "fs"
import path from "path"
import { FastifyInstance } from "fastify";

export const uploadLogsFileToS3 = async (app:FastifyInstance) => {
    app.get('/ngrok/send/logs', async (request, reply) => {
        
        async function uploadLogs(buckerName: string, filePath: string, key: string){
            const fileContent = fs.readFileSync(filePath)

            const uploadParams = {
                Bucket: buckerName,
                Key: key,
                Body: fileContent
            }
        
            const command = new PutObjectCommand(uploadParams)
            return await bucketS3Instance.send(command)
        }

        const joinPath = path.join(__dirname, "../../access.log")
        const getMetadataReturnFunction = await uploadLogs("bucket-logs", joinPath, "uploads/logs/morgan-logs.txt")

        return reply.status(201).send({
            message: "Succesfuly upload",
            getMetadataReturnFunction
        })
    })
}