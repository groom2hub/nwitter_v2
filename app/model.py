import datetime
from sqlalchemy import DATETIME, Column, TEXT, INT, BIGINT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Usertbl(Base):
    __tablename__ = "usertbl"

    user_id = Column(TEXT, nullable=False, primary_key=True)
    user_password = Column(TEXT, nullable=False)
    user_displayname = Column(TEXT, nullable=True)

class Nweettbl(Base):
    __tablename__ = "nweettbl"

    nweet_num = Column(INT, nullable=False, primary_key=True, autoincrement=True)
    nweet_text = Column(TEXT, nullable=False)
    user_id = Column(TEXT, nullable=False)
    user_displayname = Column(TEXT, nullable=True)
    created_at = Column(DATETIME, default=datetime.datetime.utcnow)
    attachment_url = Column(TEXT, nullable=True)
    like_it = Column(INT, default=0)
