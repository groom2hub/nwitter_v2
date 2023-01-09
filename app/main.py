from fastapi import FastAPI, Depends, Path, HTTPException
from pydantic import BaseModel
from database import engineconn
from model import Test1

app = FastAPI()

engine = engineconn()
session = engine.sessionmaker()

# test1 all select
@app.get("/")
async def first_get():
    example = session.query(Test1).all()
    return example

# id 존재 여부 Check
@app.get("/{id}")
def check_id(id):
    check = False
    example = session.query(Test1).filter_by(id=id).first()
    if example != None:
        check = True
    return check