FROM  python:3.8
WORKDIR /app
COPY . /app
# Install build tools
RUN apt-get update && apt-get install -y build-essential gcc python3-dev
RUN pip install -r requirements.txt
EXPOSE 5000
CMD python run.py



