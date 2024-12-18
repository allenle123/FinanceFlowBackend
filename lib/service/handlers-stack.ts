import { Stack, StackProps } from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

interface HandlersStackProps extends StackProps {
    transactionsTable: Table;
}

export class HandlersStack extends Stack {
    public readonly createTransactionHandler: Function;

    constructor(scope: Construct, id: string, props: HandlersStackProps) {
        super(scope, id, props);

        this.createTransactionHandler = new Function(this, 'CreateTransactionHandler', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.createTransaction',
            code: Code.fromAsset('lambda'),
            environment: {
                TRANSACTIONS_TABLE: props.transactionsTable.tableName,
            },
        });

        props.transactionsTable.grantReadWriteData(this.createTransactionHandler);
    }
} 