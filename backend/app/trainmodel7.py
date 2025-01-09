import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.utils import resample
from sklearn.metrics import precision_score, recall_score, f1_score

# Load and preprocess data
service_data = pd.read_excel('./Service_dataset.xlsx')

# Auto-generate `service_id` if not already present
if 'Id' not in service_data.columns:
    service_data['service_id'] = range(1, len(service_data) + 1)
else:
    service_data = service_data.rename(columns={'Id': 'service_id'})


service_data = service_data.rename(columns={
    'Title': 'title',
    'Specification': 'specification',
    'Price': 'price',
    'Category': 'category'
})[['service_id', 'title', 'specification', 'price', 'category']].dropna(subset=['price', 'category'])

service_data['service_id'] = service_data['service_id'].astype(int)
service_data['price'] = pd.to_numeric(service_data['price'], errors='coerce')

service_data['combined_features'] = service_data['title'] + ' ' + service_data['specification']
service_data = service_data[service_data['combined_features'].str.strip() != '']

# TF-IDF Vectorization
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(service_data['combined_features'])

# Create labeled dataset
selected_ids = [152, 74, 245, 340, 1050, 720, 330, 432, 656]
service_data['is_relevant'] = service_data['service_id'].isin(selected_ids).astype(int)

# Handle class imbalance by upsampling
relevant = service_data[service_data['is_relevant'] == 1]
non_relevant = service_data[service_data['is_relevant'] == 0]
relevant_upsampled = resample(relevant, replace=True, n_samples=len(non_relevant), random_state=42)
balanced_data = pd.concat([relevant_upsampled, non_relevant])

# Train/test split
X = tfidf.transform(balanced_data['combined_features'])
y = balanced_data['is_relevant']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train classifier
classifier = LogisticRegression(class_weight='balanced', random_state=42)
classifier.fit(X_train, y_train)

# Evaluate model
y_pred = classifier.predict(X_test)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
print(f"Model - Precision: {precision:.2f}, Recall: {recall:.2f}, F1-Score: {f1:.2f}")

# Recommendation function
def get_ml_recommendation_sets(selected_ids, num_sets=5):
    selected_data = service_data.loc[service_data['service_id'].isin(selected_ids)]
    recommendation_sets = []

    for _ in range(num_sets):
        set_recommendations = []

        for _, selected_row in selected_data.iterrows():
            category_data = service_data[service_data['category'] == selected_row['category']]
            category_features = tfidf.transform(category_data['combined_features'])

            # Predict relevance scores
            category_data = category_data.copy()
            category_data['relevance_score'] = classifier.predict_proba(category_features)[:, 1]

            # Filter and sort recommendations
            relevant_recommendations = category_data[
                ~category_data['service_id'].isin(selected_ids)
            ].sort_values('relevance_score', ascending=False)

            # Select top recommendation for this service
            if not relevant_recommendations.empty:
                recommendation = relevant_recommendations.head(1)
                set_recommendations.append(recommendation)

        # Only add complete sets
        if len(set_recommendations) == len(selected_data):
            recommendation_sets.append(pd.concat(set_recommendations))

    return recommendation_sets

# Example function call
recommendation_sets = get_ml_recommendation_sets(selected_ids)

# Print recommendations
for idx, rec_set in enumerate(recommendation_sets, 1):
    print(f"Recommendation Set {idx}:\n{rec_set[['service_id', 'title','category', 'price', 'relevance_score']]}\n")
