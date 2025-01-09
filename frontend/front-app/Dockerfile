# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application for production
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port where the app will run
EXPOSE 5173

# Start the application using the 'serve' package
CMD ["serve", "-s", "dist", "-l", "5173"]
