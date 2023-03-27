import random

raw = [[1, 3, 1.0], [2, 6, 1.0], [3, 6, 1.0], [8, 5, 1.0], [3, 2, 1.0], [1, 6, 1.0], [3, 7, 1.0], [4, 2, 1.0], [8, 2, 1.0], [2, 3, 1.0]]

answer = []
temp = []
for i in range(2000):
    wish = [random.randint(0,9), random.randint(1, 480)]
    if wish not in temp:
        answer.append(tuple([len(answer)] + wish))
        temp.append(wish)
print(answer)
print(len(answer))