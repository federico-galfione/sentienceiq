# --- deps (populate pnpm store for caching) ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && pnpm fetch

# --- build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /root/.pnpm-store /root/.pnpm-store
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && pnpm install --frozen-lockfile --offline
COPY . .
RUN pnpm build

# --- run production (Nitro server) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV CI=true
ENV NO_COLOR=1
ENV FORCE_COLOR=0
# Nuxt’s server output is self-contained
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]