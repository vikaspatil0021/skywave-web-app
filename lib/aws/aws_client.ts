import { EC2Client, RunInstancesCommand, RunInstancesCommandInput } from "@aws-sdk/client-ec2";

const awsConfig = {
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ID as string,
        secretAccessKey: process.env.AWS_KEY as string
    }
}

export const ec2Client = new EC2Client(awsConfig);


export const ec2_run_instance_command = (deployment_metadata: string) => {

    const userDataScript = `#!/bin/bash

        sudo su - ubuntu <<EOF

        export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v22.5.1/bin/

        export AWS_ID=${process.env.AWS_ID}
        export AWS_KEY=${process.env.AWS_KEY}

        export KAFKA_BROKER_URL=${process.env.KAFKA_BROKER_URL}
        export KAFKA_USERNAME=${process.env.KAFKA_USERNAME}
        export KAFKA_PASSWORD=${process.env.KAFKA_PASSWORD}
        export KAFKAJS_NO_PARTITIONER_WARNING=${process.env.KAFKAJS_NO_PARTITIONER_WARNING}

        export DEPLOYMENT_METADATA='${deployment_metadata}'

        cd /home/ubuntu/skywave/build-service

        pm2 start "npm run start" --name skywave-build-server
        pm2 save
        pm2 startup

        EOF
    `;
    const encodedUserData = Buffer.from(userDataScript).toString('base64');

    const params = {
        MaxCount: 1,
        MinCount: 1,
        LaunchTemplate: {
            LaunchTemplateId: process.env.AWS_LAUNCH_TEMPLATE_ID as string
        },
        UserData: encodedUserData
    } as RunInstancesCommandInput

    return new RunInstancesCommand(params);
}



