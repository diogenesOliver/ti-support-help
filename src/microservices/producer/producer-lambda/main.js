const snsClient = require('./lib/sns-client')
const { PublishCommand } = require('@aws-sdk/client-sns')

exports.openticket = async (event) => {

  const ticketDataBody = JSON.stringify(event.body)
  const input = {
    TopicArn: "arn:aws:sns:us-east-1:000000000000:ti-help-driver-sns",
    Message: ticketDataBody
  }

  const command = new PublishCommand(input)
  await snsClient.send(command)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Succesfuly from open a new ticket!"
    })
  };
};
