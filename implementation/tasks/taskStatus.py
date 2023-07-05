from enum import Enum

class TaskStatus(Enum):
    NOT_STARTED = "NOT_STARTED"
    QUEUED = "QUEUED"
    FINISHED = "FINISHED"