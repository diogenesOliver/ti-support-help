import { dynamoDBClientInstance } from "../lib/dynamo-db";
import { PutItemCommand } from '@aws-sdk/client-dynamodb'

export async function saveOnDataBaseInstance(data: string, tableName: string, itemName: string){

    const input = {
        TableName: tableName,
        Item: {
            [itemName]: {
                "S": data
            }
        }
    }

    const dynamoDbCommand = new PutItemCommand( input )
    return await dynamoDBClientInstance.send(dynamoDbCommand)
}