import aws_cdk as core
import aws_cdk.assertions as assertions

from finance_flow_backend.finance_flow_backend_stack import FinanceFlowBackendStack

# example tests. To run these tests, uncomment this file along with the example
# resource in finance_flow_backend/finance_flow_backend_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = FinanceFlowBackendStack(app, "finance-flow-backend")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
