#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { WorkshopStack } from '../lib/workshop-stack';

const app = new App();
new WorkshopStack(app, 'WorkshopStack');
