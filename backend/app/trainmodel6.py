import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Load Excel file
service_data = pd.read_excel('./Service_dataset.xlsx');


# Print the original column names
#print(service_data.columns)

# Rename relevant columns and drop unnecessary rows
service_data = service_data.rename(columns={
    'Id': 'service_id',
    'Title': 'title',
    'Specification': 'specification',
    'Price': 'price',
    'Category': 'category'
})[['service_id', 'title', 'specification', 'price', 'category']].dropna(subset=['price', 'category'])


# Convert data types
service_data['service_id'] = service_data['service_id'].astype(int)
service_data['price'] = pd.to_numeric(service_data['price'], errors='coerce')

# Combine material type and finish type for content-based similarity
service_data['combined_features'] = service_data['title'] + ' ' + service_data['specification']

# Filter out rows with empty combined features
service_data = service_data[service_data['combined_features'].str.strip() != '']

# TF-IDF Vectorization and similarity matrix
# tfidf = TfidfVectorizer(stop_words='english')
# tfidf_matrix = tfidf.fit_transform(service_data['combined_features'])
# cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def get_recommendation_sets(selected_ids):
    price_range = 0.5  # Define acceptable price deviation (e.g., ±50%)
    top_n_sets = 5     # Number of recommendation sets to generate
    
    selected_data = service_data.loc[service_data['service_id'].isin(selected_ids)]
    
    sets = []
    for _ in range(top_n_sets):
        set_per_category = []
        
        for _, selected_row in selected_data.iterrows():
            # Calculate price range for the current service
            min_price = selected_row['price'] * (1 - price_range)
            max_price = selected_row['price'] * (1 + price_range)
            
            # Filter data within price range and the same category
            category_recommendations = service_data[
                (service_data['category'] == selected_row['category']) &
                (service_data['price'].between(min_price, max_price)) &
                (~service_data['service_id'].isin(selected_ids))
            ]
            
            # Debugging output
            #print(f"Recommendations for {selected_row['category']} ({selected_row['title']}):")
            #print(category_recommendations)
            
            # Pick a random recommendation if available
            if not category_recommendations.empty:
                recommendation = category_recommendations.sample(1)
                set_per_category.append(recommendation)
            else:
                print(f"No recommendations available for {selected_row['category']} within price range.")
        
        # Only add a set if it matches all categories
        if len(set_per_category) == len(selected_data):
            sets.append(pd.concat(set_per_category))
    
    return sets

# Example function call for selected services
example_selected_ids = [152, 70, 45,40,50,20,30,32,56]  # Example: IDs of selected services
recommendation_sets = get_recommendation_sets(example_selected_ids)

# if recommendation_sets:
#     print(f"Number of recommendation sets: {len(recommendation_sets)}")
#     for idx, rec_set in enumerate(recommendation_sets, 1):
#         print(f"Recommendation Set {idx}:\n{rec_set[['service_id', 'category', 'price', 'title']]}\n")
# else:
#     print("No recommendation sets were generated.")

def evaluate_recommendation_system(selected_ids, ground_truth):
    recommendation_sets = get_recommendation_sets(selected_ids)
    recommended_ids = set()
    for rec_set in recommendation_sets:
        recommended_ids.update(rec_set['service_id'].tolist())

    relevant_ids = set(item for sublist in ground_truth.values() for item in sublist)

    # Precision and Recall
    precision = len(recommended_ids & relevant_ids) / len(recommended_ids) if recommended_ids else 0
    recall = len(recommended_ids & relevant_ids) / len(relevant_ids) if relevant_ids else 0

    return precision, recall

# Example usage
ground_truth = {
    15: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],  # Services relevant for selected ID 152
    75: [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92]     # Services relevant for selected ID 70
    # Add more selected services and their relevant recommendations
}
selected_ids = list(ground_truth.keys())


precision, recall = evaluate_recommendation_system(selected_ids, ground_truth)
print(recommendation_sets)
print(f"Precision: {precision:.2f}, Recall: {recall:.2f}")

