from sqlalchemy import *
from sqlalchemy.orm import sessionmaker

class engineconn:

    DB_URL = 'mysql+pymysql://root:qwer1234@localhost:3306/nwitter?charset=utf8'

    def __init__(self):
        self.engine = create_engine(self.DB_URL, pool_recycle = 500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn