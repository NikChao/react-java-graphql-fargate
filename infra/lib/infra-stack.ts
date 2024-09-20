import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export interface InfraStackProps extends cdk.StackProps {
  repository: ecr.Repository;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'SpringGqlAppVPC', {
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, 'SpringGqlAppCluster', {
      vpc: vpc,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'SpringGqlAppTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    const container = taskDefinition.addContainer('SpringGqlAppContainer', {
      image: ecs.ContainerImage.fromEcrRepository(props.repository),
      logging: ecs.LogDriver.awsLogs({ streamPrefix: 'SpringGqlApp' }),
    });

    container.addPortMappings({
      containerPort: 8080,
    });

    // Create Fargate Service
    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'SpringGqlAppFargateService', {
      cluster,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      publicLoadBalancer: true,
      redirectHTTP: true,
      healthCheck: {
          command: [ "CMD-SHELL", "exit 0" ],
          timeout: cdk.Duration.minutes(10),
          interval: cdk.Duration.seconds(10),
      },
    });

    fargateService.targetGroup.configureHealthCheck({
      enabled: true,
      path: '/graphiql?path=/graphql',
      healthyHttpCodes: '200',
    })

    // Optional: Define Auto Scaling policies
    const scaling = fargateService.service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 1,
    });

    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
    });

    scaling.scaleOnMemoryUtilization('MemoryScaling', {
      targetUtilizationPercent: 50,
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });
  }
}
