import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import {
    Table,
    AttributeType,
    BillingMode,
    ProjectionType,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class StorageStack extends Stack {
    public readonly transactionsTable: Table;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.transactionsTable = new Table(this, 'TransactionsTable', {
            partitionKey: { name: 'userId', type: AttributeType.STRING },
            sortKey: { name: 'transactionId', type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        // Add GSI to the table
        this.transactionsTable.addGlobalSecondaryIndex({
            indexName: 'userDate-index',
            partitionKey: { name: 'userId', type: AttributeType.STRING },
            sortKey: { name: 'date', type: AttributeType.STRING },
            projectionType: ProjectionType.ALL,
        });
    }
}
