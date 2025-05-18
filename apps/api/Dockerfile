# -------------------------
# 1) Build-Stage
# -------------------------
FROM node:18-alpine AS builder
WORKDIR /app

# 1a) Workspace-Metafiles kopieren
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# 1b) API-Package.json kopieren
COPY apps/api/package.json apps/api/

# 1c) pnpm installieren und Monorepo-Abhängigkeiten auflösen
RUN npm install -g pnpm \
 && pnpm install --frozen-lockfile

# 1d) gesamten Monorepo-Code kopieren und nur API bauen
COPY . .
RUN pnpm --filter api run build

# -------------------------
# 2) Production-Stage
# -------------------------
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 2a) Nur Lock- und Workspace-Files plus root package.json
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# 2b) API-package.json (für Runtime-Deps)
COPY apps/api/package.json apps/api/

# 2c) Nur prod-Dependencies für API installieren
RUN npm install -g pnpm \
 && pnpm install --prod --frozen-lockfile --filter api

# 2d) Den gebauten Output übernehmen
COPY --from=builder /app/apps/api/dist ./dist

# 2e) Port und Startkommando
EXPOSE 4000
CMD ["node", "dist/index.js"]
