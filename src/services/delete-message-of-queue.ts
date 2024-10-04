import { config } from "dotenv";
config()

import { sqsClientInstance } from "../lib/sqs";
import { DeleteMessageCommand } from "@aws-sdk/client-sqs";

export async function deleteSQSMessage(receiptHandle){
    const input = {
        QueueUrl: process.env.QUEUE_URL,
        ReceiptHandle: receiptHandle,
    }

    const command = new DeleteMessageCommand(input)
    return await sqsClientInstance.send(command)
}