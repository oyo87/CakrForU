import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds

raw = [[1, 3, 1.0], [2, 6, 1.0], [3, 6, 1.0], [8, 5, 1.0], [3, 2, 1.0], [1, 6, 1.0], [3, 7, 1.0], [4, 2, 1.0], [8, 2, 1.0], [2, 3, 1.0]]
df_ratings = pd.DataFrame(raw, columns=['buyer_id', 'portfolio_id', 'values'])
pivot = df_ratings.pivot_table('values', index='buyer_id', columns='portfolio_id').fillna(0.0)
ratings = np.mean(pivot.values, axis=1)
ratings_mean = pivot.values - ratings.reshape(-1,1)
print(pivot)

U, sigma, Vt = svds(ratings_mean, k = 2)
svd_predicted_ratings = np.dot(np.dot(U, np.diag(sigma)), Vt) + ratings.reshape(-1, 1)
df_predicted = pd.DataFrame(svd_predicted_ratings, index=pivot.index, columns=pivot.columns)

buyer_id = 3
sorted_predictions = df_predicted.loc[buyer_id].sort_values(ascending=False)
user_data = df_ratings[df_ratings.buyer_id == buyer_id]['portfolio_id']
print(user_data)
print(set(sorted_predictions.index) - set(user_data))
