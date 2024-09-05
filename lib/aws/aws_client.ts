// -----------aws sqs and s3 client handlers--------------
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const awsConfig = {
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ID as string,
        secretAccessKey: process.env.AWS_KEY as string
    }
}

export const sqsClient = new SQSClient(awsConfig);



export const sqs_send_message_command = (body: { repo_url: string, domain: string, deployment_id: string }) => new SendMessageCommand({
    QueueUrl: process.env.SQS_URL as string,
    MessageBody: JSON.stringify(body),
})