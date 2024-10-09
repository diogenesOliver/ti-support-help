import { dynamoDBClientInstance } from "../lib/dynamo-db";
import { ScanCommand } from "@aws-sdk/client-dynamodb";

export async function getMessages(){
   try{
      const command = new ScanCommand({
         TableName: "MessageSupport",
         Limit: 10
      })
   
      return (await dynamoDBClientInstance.send(command)).Items
   }catch(e){
      throw new Error("Internal ERROR on server rout /tickets")
   }
}