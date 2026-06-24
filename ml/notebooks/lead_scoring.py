import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("../datasets/bank.csv")

# (Optional but good practice) standardize dtypes
df = df.convert_dtypes()

# Convert ALL categorical columns
for col in df.select_dtypes(include=["object", "string"]).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))

# Features and target
X = df.drop("deposit", axis=1)
y = df["deposit"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Probability scores
lead_scores = model.predict_proba(X_test)[:, 1] * 100

print("\nSample Lead Scores:")

for i in range(10):
    score = lead_scores[i]

    if score >= 70:
        category = "HOT"
    elif score >= 40:
        category = "WARM"
    else:
        category = "COLD"

    print(f"Lead Score: {score:.2f} | Category: {category}")

    results = pd.DataFrame({
    "Lead Score": lead_scores
})

results["Category"] = results["Lead Score"].apply(
    lambda x: "HOT" if x >= 70 else ("WARM" if x >= 40 else "COLD")
)

results["Reason"] = results["Category"].apply(
    lambda x: "High conversion probability"
    if x == "HOT"
    else (
        "Moderate conversion probability"
        if x == "WARM"
        else "Low conversion probability"
    )
)

results["Action"] = results["Category"].apply(
    lambda x: "Schedule sales call and offer premium plan"
    if x == "HOT"
    else (
        "Send personalized demo and follow-up email"
        if x == "WARM"
        else "Add to nurture campaign with educational content"
    )
)

results["Personalized Message"] = results["Category"].apply(
    lambda x: "Thank you for your interest. Based on your profile, we'd love to schedule a personalized demo and discuss premium solutions."
    if x == "HOT"
    else (
        "We think our solution could be a great fit for your needs. Here's a personalized demo and success stories from similar customers."
        if x == "WARM"
        else "We're sharing helpful resources and guides to help you learn more about our solutions."
    )
)

print(results.head())

results.to_csv("../models/lead_predictions.csv", index=False)

print("Predictions saved successfully!")

import pickle

with open("../models/lead_scoring_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model saved successfully!")

