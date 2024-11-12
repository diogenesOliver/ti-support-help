import { PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketS3Instance } from "../lib/bucket-s3";

import fs from "fs"
import path from "path"

async function uploadLogsFileToS3(buckerName: string, filePath: string, key: string) {
    const fileContent = fs.readFileSync(filePath)

    const uploadParams = {
        Bucket: buckerName,
        Key: key,
        Body: fileContent
    }

    const command = new PutObjectCommand(uploadParams)
    const reponse = await bucketS3Instance.send(command)

    return console.log({
        message: "Upload_Logs_File_Succes",
        reponse
    })
}

const filePath = path.join(__dirname, "../../ngrok_debug.log")
uploadLogsFileToS3("bucket-logs", filePath, "uploads/logs/ngrok-logs.txt")