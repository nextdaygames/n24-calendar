from flask import Blueprint, request
from implementation.tasks import tasksDynamoAccess

tasksController = Blueprint('tasksController',__name__)

@tasksController.route('/tasks', methods = ['GET'])
def getTasks():
    return { "tasks": tasksDynamoAccess.getTasks()}, 200

@tasksController.route('/tasks', methods = ['POST'])
def createTask():
    body = request.get_json()

    name = body.get("name")
    if name == None or name == "":
        message = "A name is required."
        return {'message': message}, 400
    
    points = body.get("points")
    if points == None or points == "":
        message = "A points is required."
        return {'message': message}, 400    

    tasksDynamoAccess.createTask(name, points)
    return { "success": True }, 200
