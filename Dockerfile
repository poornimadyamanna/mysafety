FROM public.ecr.aws/docker/library/node:18-alpine
WORKDIR /app

# Needed because your healthcheck uses wget (alpine doesn't always have it)
RUN apk add --no-cache wget

COPY package*.json ./
RUN npm ci

COPY . .

# IMPORTANT: don't hide build errors
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
