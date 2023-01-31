import os

class ApplicationConfig:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    CORS_SUPPORTS_CREDENTIALS=True
    
    SESSION_COOKIE_SECURE=True
    SESSION_COOKIE_SAMESITE='None'
    CORS_HEADERS = "Content-Type"
    ORIGINS = [
        'http://127.0.0.1:5000'
        'http://localhost:3000',
        'https://health-monitor.herokuapp.com/',
    ]