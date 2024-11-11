FROM node:20.15.1

WORKDIR /app


COPY package*.json ./
RUN npm ci

COPY . . 

EXPOSE 3000

# Ideally I supposed to build static website and service with nginx or nest.js
# But for simplicity, I'm using dev service here
CMD ["npm", "start"]