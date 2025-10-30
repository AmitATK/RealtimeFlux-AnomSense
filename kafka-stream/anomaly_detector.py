from sklearn.ensemble import IsolationForest
import numpy as np

class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.05, random_state=42)

    def fit(self, data):
        self.model.fit(data)

    def predict(self, value):
        pred = self.model.predict([value])
        return pred[0] == -1
def anomaly_score(self, value):
    score = self.model.decision_function([value])[0]
    return abs(score)
