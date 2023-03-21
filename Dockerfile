# Use an official Node runtime as a parent image
FROM node:16.19.1

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm i

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Use Nginx for serving the app
FROM nginx:stable

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Add custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Copy the build folder from the previous stage
COPY --from=0 /usr/src/app/build /usr/share/nginx/html