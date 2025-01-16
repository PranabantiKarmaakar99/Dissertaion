# Flask-Based Data Processing and Machine Learning Application

This project is a Flask-based backend application that leverages **pandas** and **numpy** for data manipulation, **scikit-learn** for Machine Learning, and **openpyxl** for working with Excel files. The application includes Cross-Origin Resource Sharing (CORS) support using **Flask-CORS** for seamless integration with front-end applications.

---

## Features

- **Flask**: A lightweight web framework for building APIs.
- **Flask-CORS**: Enables secure communication with front-end clients across different origins.
- **pandas**: For efficient data manipulation and processing.
- **numpy**: For numerical computations.
- **scikit-learn**: For implementing machine learning models.
- **openpyxl**: For reading and writing Excel files.

---

## Prerequisites

Make sure you have the following installed before starting:

- **Python 3.8+**: [Download Python](https://www.python.org/downloads/)
- **pip**: Python's package installer (comes with Python).

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

   pip install -r requirements.txt

   Make sure the requirements.txt contains:
   Flask==2.3.2
   Flask-CORS
   pandas
   scikit-learn
   openpyxl
   numpy

   flask run


