import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime
from implementation.dbAccess.dynamoAccess import dynamodb
from .taskStatus import TaskStatus
from uuid import uuid4
tasks = dynamodb.Table('tasks')

def getTasks ():
    response = tasks.scan()
    print(response.get('Items'))
    return response.get('Items')

def createTask(name, points):
    time = datetime.utcnow().isoformat()
    tasks.put_item(
        Item = {
            'task_guid': str(uuid4()),
            'name': name,
            'points': points,
            'order': None,
            'status': TaskStatus.NOT_STARTED,
            'start_utc': None,
            'complete_utc': None,
            'created_utc': time,
            'updated_utc': time,
        } 
    )
    