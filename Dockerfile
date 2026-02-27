FROM node:18-alpine
WORKDIR /app

# install deps first (cache friendly)
COPY package*.json ./
RUN npm ci

# copy code and build
COPY . .
RUN npm run build

# production deps only (optional but recommended)
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force

# logs
RUN mkdir -p /app/logs && chmod 777 /app/logs

EXPOSE 4000
CMD ["node", "dist/index.js"]
