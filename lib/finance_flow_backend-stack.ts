import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class FinanceFlowBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda function
    const handler = new lambda.Function(this, 'FinanceFlowHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      environment: {
        STAGE: 'dev',
      }
    });

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'FinanceFlowApi', {
      restApiName: 'Finance Flow API',
      description: 'API for Finance Flow application'
    });

    // Create API Gateway resource and method
    const items = api.root.addResource('api');
    items.addMethod('GET', new apigateway.LambdaIntegration(handler));
    items.addMethod('POST', new apigateway.LambdaIntegration(handler));
  }
}
