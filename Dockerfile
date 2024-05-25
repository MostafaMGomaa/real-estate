
FROM node:21-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:21-alpine
WORKDIR /app
COPY --from=builder /app/ ./  
CMD ["npm", "run", "start"]
