# ─── Production Dockerfile für API ──────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Locks für Layer-Cache!
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/api/package.json apps/api/tsconfig.json ./apps/api/
COPY prisma ./prisma

# prepare-Hook ausschalten (kein Husky im Container nötig)
RUN pnpm pkg set scripts.prepare=":"

# ALLE Dependencies für den Build (auch TypeScript & Tools)
RUN pnpm install

# Quellcode kopieren für optimale Layer-Cache-Nutzung
COPY apps/api ./apps/api

# TypeScript build (jetzt ist tsc verfügbar)
RUN pnpm --filter api run build

# Prisma-Clients für alle Schemas generieren
RUN pnpm --filter api exec prisma generate --schema=../../prisma/auth.prisma
RUN pnpm --filter api exec prisma generate --schema=../../prisma/payments.prisma
RUN pnpm --filter api exec prisma generate --schema=../../prisma/content.prisma

# ──────────────────────────────
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/index.js"]
