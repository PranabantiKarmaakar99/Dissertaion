from app import create_app

app = create_app()

# Add a root route for the server
@app.route("/")
def home():
    print("Welcome back")
    return {"message": "Welcome to the Recommendation System API!"}

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

