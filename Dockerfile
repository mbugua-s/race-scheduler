# Dockerfile
FROM node:22 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Production Stage ---
FROM node:22 AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

# Copy built app from builder
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

# Use the compiled app
CMD ["node", "dist/main.js"]
