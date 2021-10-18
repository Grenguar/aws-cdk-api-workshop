import {
    aws_ssm as ssm,
    Stack,
    StackProps,
} from 'aws-cdk-lib';import { Construct } from "constructs";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { MyPipelineAppStage } from "./api-stack-stage";

export class ApiPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const connectionArn = ssm.StringParameter.valueForStringParameter(this, '/serverless-api/git/connection-arn', 1);
        const buildCommands = [
            'npm ci',
            'npm run build',
            'cd infra',
            'npm ci',
            'npm run build',
            'npx cdk synth',
            'mv cdk.out ../'
        ];

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'ServerlessAPI-Pipeline',
            synth: new ShellStep('Build', {
                input: CodePipelineSource.connection('Grenguar/aws-cdk-api-workshop', 'main', {
                    connectionArn: connectionArn,
                }),
                commands: buildCommands
            }),
            selfMutation: true,
        });

        pipeline.addStage(new MyPipelineAppStage(this, "Deploy"));
    }
}