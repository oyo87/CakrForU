import random
import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds

raw = []
for _ in range(400):
    temp = [random.randint(0,30), random.randint(0,30), 1.0]
    if temp not in raw:
        raw.append(temp)


tid = 3
df_ratings = pd.DataFrame(raw, columns=['buyer_id', 'portfolio_id', 'values'])
pivot = df_ratings.pivot_table('values', index='buyer_id', columns='portfolio_id').fillna(0.0)
ratings = np.mean(pivot.values, axis=1)
ratings_mean = pivot.values - ratings.reshape(-1, 1)
U, sigma, Vt = svds(ratings_mean, k=4)
svd_predicted_ratings = np.dot(np.dot(U, np.diag(sigma)), Vt) + ratings.reshape(-1, 1)
df_predicted = pd.DataFrame(svd_predicted_ratings, index=pivot.index, columns=pivot.columns)
sorted_predictions = df_predicted.loc[tid].sort_values(ascending=False)
user_data = df_ratings[df_ratings.buyer_id == tid]['portfolio_id']
print([ele for ele in sorted_predictions.index if ele not in user_data.index])