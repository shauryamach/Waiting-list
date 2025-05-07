# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose React's default port
EXPOSE 3000

# Start the React dev server
CMD ["npm", "start"]
