from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi import Query

# Update the DATABASE_URL to use MySQL serv
DATABASE_URL = "mysql+pymysql://admin:commodle-2024@commodle-db.cv2wo88ig6at.us-east-1.rds.amazonaws.com:3306/Commodle?ssl_disabled=true"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

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

class User(Base):
    __tablename__ = "Account_Info"
    Account_name = Column(String, primary_key=True, index=True)
    Account_email = Column(String, index=True)
    Account_pass = Column(String, unique=True, index=True)

class location(Base):
    __tablename__="Location_information"
    location_identity = Column(String, primary_key=True, index=True)
    lat_val = Column(String, index=True)
    long_val = Column(String, unique=True, index=True)
    loc_name = Column(String, index=True)
    Bathroom_rating = Column(String, index=True)
    Bathroom_desc = Column(String, index=True)
    
class Favorites(Base):
    __tablename__="UserFavorites"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_email = Column(String, index=True, nullable = False)
    bathroom_keyval = Column(String, index=True, nullable = False)

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Account_email = Column(String, index=True)
    Rating = Column(Integer, index=True)
    Review_content = Column(String, index=True)
    Bathroom_id = Column(Integer, index=True)

Base.metadata.create_all(bind=engine)

class FavoriteCreate(BaseModel):
    user_email: str
    bathroom_keyval: str
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class ReviewCreate(BaseModel):
    Account_email: str
    Rating: int
    Review_content: str
    Bathroom_id: int


@app.post("/reviews/")
def submit_review(review: ReviewCreate):
    db = SessionLocal()
    db_review = Review(Account_email=review.Account_email, Rating=review.Rating, Review_content=review.Review_content, Bathroom_id=review.Bathroom_id)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    db.close()
    return db_review


@app.post("/users/")
def create_user(user: UserCreate):
    db = SessionLocal()
    db_user = User(Account_name=user.name, Account_email=user.email, Account_pass=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db.close()
    return db_user
#new
@app.post("/favorites/")
def create_favorite(favorite: FavoriteCreate, db: Session = Depends(get_db)):
    db_favorite = Favorites(user_email=favorite.user_email, bathroom_keyval=favorite.bathroom_keyval)
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return db_favorite
#new
#checks to see if the account already has the bathroom favorited    
@app.get("/favorites/")
def check_favorites(user_email: str = Query(...), bathroom_keyval: str = Query(...), db: Session = Depends(get_db)):
    favorite = db.query(Favorites).filter(
        Favorites.user_email == user_email,
        Favorites.bathroom_keyval == bathroom_keyval
    ).first()
    #run if the account has the bathroom as a favorite
    if favorite:
        return True
    #the user is not favorited
    else:
        return False
#new
#delete the favorite if the button is pressed 
@app.delete("/favorites/")
def delete_favorite(user_email: str, bathroom_keyval: str, db: Session = Depends(get_db)):
    favorite = db.query(Favorites).filter(
        Favorites.user_email == user_email,
        Favorites.bathroom_keyval == bathroom_keyval
    ).first()
    db.delete(favorite)
    db.commit()
    return {"Favorite removed successfully"}

 
@app.get("/locations/")
def get_all_locations(db: Session = Depends(get_db)):
    locations = db.query(location).all()
    return[
        {
            "location_identity": location.location_identity,
            "lat_val": location.lat_val,
            "long_val": location.long_val,
            "loc_name": location.loc_name,
            "Bathroom_rating": location.Bathroom_rating,
            "Bathroom_desc": location.Bathroom_desc
        }
        for location in locations
    ]



@app.get("/reviews/")
def get_all_reviews(db: Session = Depends(get_db)):
    reviews = db.query(Review).all()
    return[
        {
            "id": review.id,
            "Account_email": review.Account_email,
            "Rating": review.Rating,
            "Review_content": review.Review_content,
            "Bathroom_id": review.Bathroom_id
        }
        for review in reviews
    ]