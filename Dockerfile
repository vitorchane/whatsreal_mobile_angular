# 1. Application build
FROM node:20 AS build

WORKDIR /app

# Copy configuration files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy the entire project
COPY . .

# Build the Angular application
RUN ng build --configuration production --localize=false

# 2. Serve the application
FROM nginx:alpine

# Copy build to Nginx
COPY --from=build /app/dist/whatsreal_mobile_angular/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]