import { Stack, StackProps } from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

interface HandlersStackProps extends StackProps {
    transactionsTable: Table;
}

export class HandlersStack extends Stack {
    public readonly TransactionHandler: Function;

    constructor(scope: Construct, id: string, props: HandlersStackProps) {
        super(scope, id, props);

        this.TransactionHandler = new Function(this, 'TransactionHandler', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'dist/handlers/index.handler',
            code: Code.fromAsset('lambda'),
            environment: {
                STAGE: 'dev',
                TRANSACTIONS_TABLE: props.transactionsTable.tableName
            }
        });

        props.transactionsTable.grantReadWriteData(this.TransactionHandler);
    }
} 