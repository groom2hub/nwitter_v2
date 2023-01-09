from sqlalchemy import Column, TEXT, INT, BIGINT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Test1(Base):
    __tablename__ = "test1"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    name = Column(TEXT, nullable=False)
    age = Column(INT, nullable=False)