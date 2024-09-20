#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import {EcrStack} from "../lib/ecr-stack";

const app = new cdk.App();
const env = { account: "381491988501", region: "ap-southeast-2" };

const { repository } = new EcrStack(app, "GqlEcrStack", { env });
new InfraStack(app, 'GqlInfraStack', {
    repository,
    env
});