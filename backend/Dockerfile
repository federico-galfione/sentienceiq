# --- deps (cache pnpm store) ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && pnpm fetch

# --- build (needs dev deps) ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /root/.pnpm-store /root/.pnpm-store
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && pnpm install --frozen-lockfile --offline
COPY . .
RUN pnpm build

# --- run (only prod deps) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && pnpm install --prod --frozen-lockfile --offline
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main.js"]