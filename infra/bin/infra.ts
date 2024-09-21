#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import {EcrStack} from "../lib/ecr-stack";
import {FrontendSpaStack} from "../lib/frontend-spa-stack";
import {CertificateStack} from "../lib/certificate-stack";
import {DnsStack} from "../lib/dns-stack";

/** uncomment if you have a purchased domain name on AWS! */
// const domainName = "www.domain.com";
// const hostedZoneId = "HOSTED_ZONE_ID";

const app = new cdk.App();
const env = { account: "381491988501", region: "ap-southeast-2" };

const { repository } = new EcrStack(app, "GqlEcrStack", { env });
new InfraStack(app, 'GqlInfraStack', {
    repository,
    env
});
/** uncomment if you have a purchased domain name on AWS! */
// const { hostedZone } = new CertificateStack(app, 'CertificateStack', { env, hostedZoneId, domainName });

const { distribution } = new FrontendSpaStack(app, 'FrontendSpaStack', { env });

/** uncomment if you have a purchased domain name on AWS! */
// const dnsStack = new DnsStack(app, 'DnsStack', { env, hostedZone, domainName, distribution })