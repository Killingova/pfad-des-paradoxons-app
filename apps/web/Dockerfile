# ─── apps/web/Dockerfile (Production) ────────────────────────────────────────

# 1. Build-Stage: Erzeuge statische Assets
FROM node:18-alpine AS builder

WORKDIR /app

# Nur was zum Bauen gebraucht wird kopieren!
COPY package.json tsconfig.json vite.config.ts ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

# 2. Production-Stage: NGINX zum Ausliefern der gebauten statischen Seite
FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
