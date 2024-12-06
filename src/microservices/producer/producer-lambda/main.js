const snsClient = require('./lib/sns-client')
const { PublishCommand } = require('@aws-sdk/client-sns')

exports.openticket = async (event) => {

  /*const { message } = JSON.parse(event.body)

  const command = new PublishCommand({
    Message: message,
    TopicArn: "arn:aws:sns:us-east-1:000000000000:ti-help-driver-sns"
  })

  await snsClient.send(command)*/

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Succesfuly from open a new ticket!"
    })
  };
};
