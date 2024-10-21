from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Update the DATABASE_URL to use MySQL
DATABASE_URL = "mysql+pymysql://admin:commodle-2024@commodle-db.cv2wo88ig6at.us-east-1.rds.amazonaws.com:3306/Commodle?ssl_disabled=true"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:3000",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(Base):
    __tablename__ = "Account_Info"
    Account_name = Column(String, primary_key=True, index=True)
    Account_email = Column(String, index=True)
    Account_pass = Column(String, unique=True, index=True)

Base.metadata.create_all(bind=engine)

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

@app.post("/users/")
def create_user(user: UserCreate):
    db = SessionLocal()
    db_user = User(Account_name=user.name, Account_email=user.email, Account_pass=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db.close()
    return db_user