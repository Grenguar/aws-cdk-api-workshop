import {ApiStack} from "./api-stack";
import {Stage, StageProps} from "aws-cdk-lib";
import {Construct} from "constructs";

export class MyPipelineAppStage extends Stage {

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);
        new ApiStack(this, 'APIStack');
    }
}