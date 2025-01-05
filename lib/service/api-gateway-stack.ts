import { Stack, StackProps } from 'aws-cdk-lib';
import { RestApi, LambdaIntegration, MethodOptions, MockIntegration, Integration, PassthroughBehavior } from 'aws-cdk-lib/aws-apigateway';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

interface ApiGatewayStackProps extends StackProps {
    transactionHandler: Function;
}

export class ApiGatewayStack extends Stack {
    public readonly api: RestApi;

    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id, props);

        // Create the API
        this.api = new RestApi(this, 'FinanceFlowApi', {
            restApiName: 'Finance Flow API',
            description: 'API for Finance Flow application',
            defaultCorsPreflightOptions: {
                allowOrigins: ['http://localhost:5173'], // Allow your frontend origin
                allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
                allowHeaders: ['Content-Type', 'Authorization', 'Clerk-Signature'], // Allowed headers
                allowCredentials: true,  // Allow credentials
            },
        });

        // Create the resource for transactions
        const transactionsResource = this.api.root.addResource('api');

        // Use Lambda Integration with Proxy Integration
        const transactionIntegration = new LambdaIntegration(props.transactionHandler, {
            proxy: true, // Enable Lambda Proxy Integration
        });

        // Add the methods for GET, POST, PUT, DELETE
        transactionsResource.addMethod('GET', transactionIntegration);
        transactionsResource.addMethod('POST', transactionIntegration);
        transactionsResource.addMethod('PUT', transactionIntegration);
        transactionsResource.addMethod('DELETE', transactionIntegration);
    }
}
