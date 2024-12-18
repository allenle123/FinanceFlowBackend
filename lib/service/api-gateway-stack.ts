import { Stack, StackProps } from 'aws-cdk-lib';
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

interface ApiGatewayStackProps extends StackProps {
    transactionHandler: Function;
}

export class ApiGatewayStack extends Stack {
    public readonly api: RestApi;

    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id, props);

        this.api = new RestApi(this, 'FinanceFlowApi', {
            restApiName: 'Finance Flow API',
            description: 'API for Finance Flow application'
        });

        const items = this.api.root.addResource('api');
        items.addMethod('GET', new LambdaIntegration(props.transactionHandler));
        items.addMethod('POST', new LambdaIntegration(props.transactionHandler));
        items.addMethod('DELETE', new LambdaIntegration(props.transactionHandler));
    }
}
