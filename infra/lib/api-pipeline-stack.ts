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

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection('Grenguar/aws-cdk-api-workshop', 'main', {
                    connectionArn: connectionArn,
                }),
                commands: ['npm ci', 'npm run build', 'cd infra', 'npm ci', 'npm run build', 'npx cdk synth']
            })
        });

        pipeline.addStage(new MyPipelineAppStage(this, "test"));
    }

}