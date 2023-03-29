from flask import Flask, jsonify
from scipy.sparse.linalg import svds

# ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

import pandas as pd
import numpy as np


app = Flask(__name__)

mysql_url = "mysql+pymysql://root:root@localhost:3306/C4U?charset=utf8"
engine = create_engine(mysql_url, echo=True)

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
    __tablename__ = 'wishlist'

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
    raw = []
    tid = int(tid)
    for wish in Wishlist.query.all():
        raw.append([wish.buyer_id, wish.portfolio_id, 1.0])
    df_ratings = pd.DataFrame(raw, columns=['buyer_id', 'portfolio_id', 'values'])
    pivot = df_ratings.pivot_table('values', index='buyer_id', columns='portfolio_id').fillna(0.0)
    if tid not in pivot.index:
        return jsonify(list())
    ratings = np.mean(pivot.values, axis=1)
    ratings_mean = pivot.values - ratings.reshape(-1, 1)

    U, sigma, Vt = svds(ratings_mean, k=2)
    svd_predicted_ratings = np.dot(np.dot(U, np.diag(sigma)), Vt) + ratings.reshape(-1, 1)
    df_predicted = pd.DataFrame(svd_predicted_ratings, index=pivot.index, columns=pivot.columns)
    sorted_predictions = df_predicted.loc[tid].sort_values(ascending=False)
    user_data = df_ratings[df_ratings.buyer_id == tid]['portfolio_id']
    return jsonify([ele for ele in sorted_predictions.index if ele not in user_data.index])

if __name__ == "__main__" :
    # app.run(host='127.0.0.1', port=8080, debug=True)
    app.run(host='0.0.0.0', port=8060)
