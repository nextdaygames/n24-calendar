import boto3
from implementation.configuration.dynamoConfiguration import AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY

dynamodb = boto3.resource('dynamodb', 
    endpoint_url="https://dynamodb.us-west-2.amazonaws.com", 
    region_name="us-west-2",
    aws_access_key_id=AWS_ACCESS_KEY, 
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    
dynamodbClient = boto3.resource('dynamodb', 
    endpoint_url="https://dynamodb.us-west-2.amazonaws.com", 
    region_name="us-west-2",
    aws_access_key_id=AWS_ACCESS_KEY, 
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY)