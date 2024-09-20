# Developer guide

## Pushing docker image
1. build docker image
    * `docker build -t javagql .`
2. tag docker image with name of repository
    * i.e. `docker tag javagql:latest 381491988501.dkr.ecr.ap-southeast-2.amazonaws.com/javagqldemo`
3. get your docker registry credentials from ECR and sign in with docker
    * `aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 381491988501.dkr.ecr.ap-southeast-2.amazonaws.com/javagqldemo`
4. push the docker image to the repository
    * `docker push 381491988501.dkr.ecr.ap-southeast-2.amazonaws.com/javagqldemo`

## Bounce ECS host
```
aws ecs update-service --cluster GqlInfraStack-SpringGqlAppCluster4C657CAB-Vp8orpO1WjnJ
 --service GqlInfraStack-SpringGqlAppFargateService3B290D0F-7GGiDLfQghWy --force-new-deployment
```

## Deployments
1. deploy through CDK `infra/` package
2. Example deployment: http://gqlinf-sprin-odb9tthqr5vs-1746189948.ap-southeast-2.elb.amazonaws.com/health