import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StorageStack } from './storage/storage-stack';
import { HandlersStack } from './service/handlers-stack';
import { ApiGatewayStack } from './service/api-gateway-stack';
export class FinanceFlowBackendStack extends Stack {
	public readonly storageStack: StorageStack;
	public readonly handlersStack: HandlersStack;
	public readonly apiGatewayStack: ApiGatewayStack;

	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		this.storageStack = new StorageStack(this, 'StorageStack');

		this.handlersStack = new HandlersStack(this, 'HandlersStack', {
			transactionsTable: this.storageStack.transactionsTable,
		});

		this.apiGatewayStack = new ApiGatewayStack(this, 'ApiGatewayStack', {
			transactionHandler: this.handlersStack.TransactionHandler,
		});
	}
}
