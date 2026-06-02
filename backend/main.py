from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import engine
from models import db_models
from routes.contacts import router

# Create all tables on startup
db_models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {"message": "Contact API is running!"}
