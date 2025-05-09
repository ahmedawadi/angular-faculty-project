# Stage 1: Build image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the Angular default port
EXPOSE 4200

# Run Angular app in dev mode
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
