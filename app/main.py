from fastapi import FastAPI, Depends, Path, HTTPException
from pydantic import BaseModel
from database import engineconn
from model import Usertbl, Nweettbl

from fastapi.middleware.cors import CORSMiddleware # NO CORS

origins = ["*"]

origins = [
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = engineconn()
session = engine.sessionmaker()

# test1 all select
@app.get("/usertbl")
async def first_get():
    example = session.query(Usertbl).all()
    return example

@app.get("/usertbl/{currentUserId}")
async def curUser_get(currentUserId):
    example = session.query(Usertbl).filter_by(user_id=currentUserId).first()
    return example

@app.get("/updatedisplayname/{currentUserId}/{displayname}")
async def updatedisplayname(currentUserId, displayname):
    try:
        session.query(Usertbl).filter_by(user_id = currentUserId).update({Usertbl.user_displayname: displayname})
        session.commit()
        return True
    except:
        session.rollback()
        raise
        return False
    finally:
        session.close()

@app.get("/nweettbl")
async def first_get():
    example = session.query(Nweettbl).all()
    return example

@app.get("/addnweet/{text}/{creatorId}/{displayName}")
async def add_nweet(text, creatorId, displayName):
    try:
        new_nweet = Nweettbl(nweet_text=text, user_id=creatorId, user_displayname=displayName)
        session.add(new_nweet)
        session.commit()
        return True
    except:
        session.rollback()
        raise
        return False
    finally:
        session.close()

@app.get("/delnweet/{nweet_num}")
async def del_nweet(nweet_num):
    try:
        select_nweet = session.query(Nweettbl).filter_by(nweet_num=nweet_num).first()
        session.delete(select_nweet)
        session.commit()
        return True
    except:
        session.rollback()
        raise
        return False
    finally:
        session.close()

@app.get("/updatenweet/{nweet_num}/{newNweet}")
async def update_nweet(nweet_num, newNweet):
    try:
        session.query(Nweettbl).filter_by(nweet_num = nweet_num).update({Nweettbl.nweet_text: newNweet})
        session.commit()
        return True
    except:
        session.rollback()
        raise
        return False
    finally:
        session.close()

@app.get("/likenweet/{nweet_num}/")
async def update_nweet(nweet_num):
    try:
        session.query(Nweettbl).filter_by(nweet_num = nweet_num).update({Nweettbl.like_it: Nweettbl.like_it+1})
        session.commit()
        return True
    except:
        session.rollback()
        raise
        return False
    finally:
        session.close()

# Login
@app.get("/login/{id}/{password}")
def login(id, password):
    check_id = session.query(Usertbl).filter_by(user_id=id).first()
    check_pw = session.query(Usertbl).filter_by(user_password=password).first()
    if check_id != None:
        if check_pw != None:
            return True
        else:
            return "Wrong Password"
    else:
        return "Wrong ID"
    
# logged-in user
@app.get("/login/{id}/{password}/currentUser")
def currentUser():
    currentUser = session.query(Usertbl).filter_by(user_id={id}).first()
    return currentUser

@app.get("/signup/{id}/{password}")
def signup(id, password):
    check_id = session.query(Usertbl).filter_by(user_id=id).first()
    if check_id != None:
        return False
    else :
        try:
            new_user = Usertbl(user_id=id, user_password=password)
            session.add(new_user)
            session.commit()
            return True
        except:
            session.rollback()
            raise
            return False
        finally:
            session.close()
    
    