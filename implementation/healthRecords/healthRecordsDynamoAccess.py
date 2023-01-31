import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime
from implementation.dbAccess.dynamoAccess import dynamodb
healthRecords = dynamodb.Table('health_records')

def getHealthRecords ():
    response = healthRecords.scan()
    return response.get('Items')

def createHealthRecord(recordType):
    time = datetime.utcnow().isoformat()
    healthRecords.put_item(
        Item = {
            'record_type': recordType,
            'created_utc': time,
            'updated_utc': time,
        } 
    )
    