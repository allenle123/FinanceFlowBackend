import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class FinanceFlowBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB table for transactions
    const transactionsTable = new dynamodb.Table(this, 'TransactionsTable', {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'transactionId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl'
    });

    // Add GSI to the table
    transactionsTable.addGlobalSecondaryIndex({
      indexName: 'userDate-index',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'date', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL
    });

    // Create Lambda function
    const handler = new lambda.Function(this, 'FinanceFlowHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      environment: {
        STAGE: 'dev',
        TRANSACTIONS_TABLE: transactionsTable.tableName
      }
    });

    // Grant Lambda permissions to DynamoDB
    transactionsTable.grantReadWriteData(handler);

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'FinanceFlowApi', {
      restApiName: 'Finance Flow API',
      description: 'API for Finance Flow application'
    });

    // Create API Gateway resource and method
    const items = api.root.addResource('api');
    items.addMethod('GET', new apigateway.LambdaIntegration(handler));
    items.addMethod('POST', new apigateway.LambdaIntegration(handler));
    items.addMethod('DELETE', new apigateway.LambdaIntegration(handler));
  }
}
