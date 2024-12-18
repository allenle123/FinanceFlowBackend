# Finance Flow Backend 🚀

[![AWS CDK](https://img.shields.io/badge/AWS_CDK-v2-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/cdk/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

## 🏗️ Architecture

The backend is built using AWS CDK and consists of three main stacks:

- **Storage Stack**: DynamoDB tables for data persistence
- **Handlers Stack**: Lambda functions for business logic
- **API Gateway Stack**: REST API endpoints

## 🚀 Getting Started

### Prerequisites
1. AWS Account and CLI configured
2. Node.js installed
3. AWS CDK CLI installed:
```bash
npm install -g aws-cdk
```

### Initial Setup
1. Install dependencies in both root and lambda directories:
```bash
npm install
```

2. Bootstrap your AWS environment:
```bash
cdk bootstrap aws://ACCOUNT_ID/REGION
```

## 🧪 Development & Testing

### Local Testing
```bash
# Synthesize CloudFormation template
cdk synth

# Preview changes
cdk diff
```

### Deployment
```bash
# Deploy to AWS
cdk deploy
```

## ✅ Verification

After deployment, verify your resources in the AWS Console:
* [AWS Management Console](https://us-east-2.console.aws.amazon.com/)
* Check the following services:
  * API Gateway
  * Lambda Functions
  * DynamoDB Tables

## 📦 Stack Details

### Storage Stack
- DynamoDB table for transactions
- Global Secondary Index for date-based queries
- Pay-per-request billing mode

### Handlers Stack
- Lambda functions for CRUD operations
- Environment variables for table names
- Proper IAM permissions

### API Gateway Stack
- REST API endpoints
- Lambda integrations
- HTTP methods: GET, POST, DELETE

## 🛠️ Useful Commands

- `cdk synth` - Synthesize CloudFormation template
- `cdk diff` - Compare deployed stack with current state
- `cdk deploy` - Deploy this stack to AWS
- `cdk destroy` - Remove this stack from AWS