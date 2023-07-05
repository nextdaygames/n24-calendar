from flask import Blueprint, request
from implementation.healthRecords import healthRecordsDynamoAccess

healthRecordsController = Blueprint('healthRecordsController',__name__)

@healthRecordsController.route('/health-records', methods = ['GET'])
def getHealthRecords():
    # healthRecordsDynamoAccess.getHealthRecords()
    return { "healthRecords": []}, 200

@healthRecordsController.route('/health-records', methods = ['POST'])
def createHealthRecord():
    body = request.get_json()

    recordType = body.get("recordType")
    if recordType == None or recordType == "":
        message = "A recordType is required."
        return {'message': message}, 400

    healthRecordsDynamoAccess.createHealthRecord(recordType)
    return { "success": True }, 200
