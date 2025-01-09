# Use an official Node.js image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production



# Copy the rest of the backend code
COPY . .

# Expose the application port
EXPOSE 3001

# Wait for the database to be ready, then run feedData script and start the application
CMD [ "npm", "start"]

