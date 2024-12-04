import { config } from "dotenv";
config()

import { sqsClientInstance } from "../lib/sqs";
import { ListDeadLetterSourceQueuesCommand } from "@aws-sdk/client-sqs";

export async function listDeadLetterSourceQueues(){
    const command = new ListDeadLetterSourceQueuesCommand({
        QueueUrl: "https://localhost.localstack.cloud:4566/000000000000/ti-help-driver-sqs",
        MaxResults: 10
    })

    return await sqsClientInstance.send(command)
}