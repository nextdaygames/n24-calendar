from flask import Blueprint, request
from flask_cors import cross_origin

healthRecordsController = Blueprint('healthRecordsController',__name__)

from implementation.healthRecords import healthRecordsDynamoAccess

@healthRecordsController.after_request 
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

@healthRecordsController.route('/health-records', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getHealthRecords():

    return { "healthRecords": healthRecordsDynamoAccess.getHealthRecords()}, 200

@healthRecordsController.route('/health-records', methods = ['POST'])
@cross_origin(supports_credentials=True)
def createHealthRecord():
    body = request.get_json()

    recordType = body.get("recordType")
    if recordType == None or recordType == "":
        message = "A recordType is required."
        return {'message': message}, 400

    healthRecordsDynamoAccess.createHealthRecord(recordType)
    return { "success": True }, 200
