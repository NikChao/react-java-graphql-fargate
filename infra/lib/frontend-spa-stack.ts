import * as cdk from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  Distribution,
  IDistribution,
  OriginAccessIdentity,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { AnyPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

/**
 * Uncomment certificate and domain name props when you want a custom domain!
 */
interface FrontendSpaStackProps extends cdk.StackProps {
  // domainName: string;
  // certificate: Certificate;
}

export class FrontendSpaStack extends cdk.Stack {
  public distribution: IDistribution;

  constructor(scope: Construct, id: string, props: FrontendSpaStackProps) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }
    });

    // Allow public read access to the bucket
    websiteBucket.addToResourcePolicy(new PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [`${websiteBucket.bucketArn}/*`],
      principals: [new AnyPrincipal()],
    }));

    const accessIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity",
      { comment: `${websiteBucket.bucketName}-access-identity` }
    );

    websiteBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [websiteBucket.arnForObjects("*")],
        principals: [accessIdentity.grantPrincipal],
      })
    );

    // Create the CloudFront distribution
    this.distribution = new Distribution(this, 'SiteDistribution', {
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(websiteBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    /**
     * Uncomment certificate and domain name usage when you want a custom domain!
     */
      // domainNames: [props.domainName],
      // certificate: props.certificate,
    });

    new BucketDeployment(this, "BucketDeployment", {
      sources: [Source.asset("../webapp/dist")],
      destinationBucket: websiteBucket,
      // Invalidate the cache for / and index.html when we deploy so that cloudfront serves latest site
      distribution: this.distribution,
      distributionPaths: ["/"],
    });

    new cdk.CfnOutput(this, "cloudfront domain", {
      description: "The domain of the website",
      value: this.distribution.distributionDomainName,
    });
  }
}