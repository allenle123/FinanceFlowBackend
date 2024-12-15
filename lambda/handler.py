import json
import os
import boto3
from uuid import uuid4

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def main(event, context):
    http_method = event['httpMethod']
    
    if http_method == 'GET':
        # Get all items
        response = table.scan()
        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'])
        }
        
    elif http_method == 'POST':
        # Create new item
        body = json.loads(event['body'])
        item = {
            'id': str(uuid4()),
            'content': body['content']
        }
        table.put_item(Item=item)
        return {
            'statusCode': 201,
            'body': json.dumps(item)
        }
    
    return {
        'statusCode': 400,
        'body': json.dumps({'error': 'Unsupported HTTP method'})
    }