import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

interface HandlersStackProps extends StackProps {
    transactionsTable: Table;
}

export class HandlersStack extends Stack {
    public readonly TransactionHandler: NodejsFunction;

    constructor(scope: Construct, id: string, props: HandlersStackProps) {
        super(scope, id, props);

        this.TransactionHandler = new NodejsFunction(
            this,
            'TransactionHandler',
            {
                runtime: Runtime.NODEJS_18_X,
                entry: 'src/functions/transactions/index.ts',
                handler: 'handler',
                environment: {
                    STAGE: 'dev',
                    TRANSACTIONS_TABLE: props.transactionsTable.tableName,
                },
            },
        );

        props.transactionsTable.grantReadWriteData(this.TransactionHandler);
    }
}
