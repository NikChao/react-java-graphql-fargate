import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {InfraStackProps} from "./infra-stack";
import * as ecr from "aws-cdk-lib/aws-ecr";

export class EcrStack extends cdk.Stack {
    repository: ecr.Repository;

    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        // Create a new ECR repository
        this.repository = new ecr.Repository(this, 'SpringGqlAppRepository', {
          repositoryName: 'javagqldemo',
        });
    }
}