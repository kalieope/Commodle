from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Update the DATABASE_URL to use MySQL
DATABASE_URL = "mysql+pymysql://admin:commodle-2024@commodle-db.cv2wo88ig6at.us-east-1.rds.amazonaws.com:3306/Commodle?ssl_disabled=true"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

# Define the User model
class User(Base):
    __tablename__ = "Account_Info"
    Account_name = Column(String, primary_key=True, index=True)
    Account_email = Column(String, index=True)
    Account_pass = Column(String, unique=True, index=True)

# Define the Location model
class Location(Base):
    __tablename__ = "Location_information"
    location_identity = Column(String, primary_key=True, index=True)
    lat_val = Column(String, index=True)
    long_val = Column(String, unique=True, index=True)

# Create tables in the database if they don't exist
Base.metadata.create_all(bind=engine)

# Define Pydantic model for User creation
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

# Create a new user
@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(Account_name=user.name, Account_email=user.email, Account_pass=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Read location information based on location_identity
@app.get("/Location_information/{location_identity}")
def read_location(location_identity: str, db: Session = Depends(get_db)):
    location = db.query(Location).filter(Location.location_identity == location_identity).first()
    
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")

    payload = {
        "lat_val": location.lat_val,
        "long_val": location.long_val,
        "location_identity": location.location_identity
    }
    
    return payload