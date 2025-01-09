from flask import Blueprint, request, jsonify
from .trainmodel2 import get_ml_recommendation_sets # Updated import path
from flask import Flask
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app,support_credentials=True)

bp = Blueprint('recommendations', __name__)  # Renamed Blueprint instance

@bp.route('/recommendations', methods=['POST'])  # Removed trailing slash
@cross_origin(supports_credentials=True)
def recommendations():
    # Parse incoming JSON request 
    data = request.json
    selected_service_id = data.get('selected_service_id')
    #budget = data.get('budget')

    # # Validate input
    if selected_service_id is None :
        return jsonify({"error": "Missing 'selected_service_id' "})

    try:
        # Get recommendations from the model
        recommendations = get_ml_recommendation_sets(selected_service_id)
          # Convert the DataFrame to a list of dictionaries for JSON serialization
        recommendations_dict = [rec_set[['service_id', 'category', 'title', 'price']].to_dict(orient='records') for rec_set in recommendations]
        return jsonify(recommendations_dict)
      

        # Output each recommendation set
        for idx, rec_set in enumerate(recommendations, 1):
         print(f"Recommendation Set {idx}:\n{rec_set[['service_id', 'category', 'price']]}\n")
         return jsonify(f"Recommendation Set {idx}:\n{rec_set[['service_id', 'category', 'price']]}\n")
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

