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
            const reponse = await bucketS3Instance.send(command)
        
            return reply.status(201).send({
                message: "Upload_Logs_File_Succes",
                reponse
            })
        }

        const joinPath = path.join(__dirname, "../../ngrok_debug.log")
        uploadLogs("bucket-logs", joinPath, "uploads/logs/ngrok-logs.txt")
    })
}