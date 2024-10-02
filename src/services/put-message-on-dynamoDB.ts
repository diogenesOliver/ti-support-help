import { dynamoDBClientInstance } from "../lib/dynamo-db";
import { PutItemCommand } from '@aws-sdk/client-dynamodb'

export async function insertTicketOnDataBase(ticketData: string){

    const input = {
        TableName: "MessageSupport",
        Item: {
            "TicketSupport": {
                "S": ticketData
            }
        }
    }

    const dynamoDbCommand = new PutItemCommand( input )
    return await dynamoDBClientInstance.send(dynamoDbCommand)
}