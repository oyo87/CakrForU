from flask import Flask, jsonify

# ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

# json to dictionary
import json
# sklearn 머신러닝 라이브러리
from sklearn.feature_extraction import DictVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

mysql_url = "mysql+pymysql://root:root@localhost:3306/c4u?charset=utf8"
engine = create_engine(mysql_url, echo=True, convert_unicode=True)

# Declare & create Session
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
# Create SqlAlchemy Base Instance
Base = declarative_base()
Base.query = db_session.query_property()

def init_database():
    Base.metadata.create_all(bind=engine)

@app.before_first_request
def beforeFirstRequest():
    init_database()

@app.teardown_appcontext
def teardownContext(exception):
    db_session.remove()

class Wishlist(Base):
    __tablename__ = 'WishList'

    id = Column(Integer, primary_key=True)
    buyer_id = Column(Integer)
    portfolio_id = Column(Integer)

class Portfolio(Base):
    __tablename__ = 'portfolio'

    id = Column(Integer, primary_key=True)
    age_group = Column(Integer)
    color = Column(String)
    cream_taste = Column(String)
    gender = Column(String)
    hit = Column(Integer)
    shape = Column(String)
    sheet_taste = Column(String)
    situation = Column(String)

@app.route("/db/<tid>")
def db_conn(tid):
    answer = []
    for i in Wishlist.query.filter_by(buyer_id=tid).join(Portfolio, Wishlist.portfolio_id == Portfolio.id):
        answer.append(i.portfolio_id)
    return jsonify(answer)

if __name__ == "__main__" :
    # app.run(host='127.0.0.1', port=8080, debug=True)
    app.run(host='0.0.0.0', port=8060)