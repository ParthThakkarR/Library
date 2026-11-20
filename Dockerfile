# LibraryHub - Next.js 15 production image
# Multi-stage build for smaller final image

# ---- Builder ----
FROM node:20-alpine AS builder

# Install libc6-compat for Prisma engines
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
COPY prisma ./prisma/

# Install deps and generate Prisma Client
RUN npm ci && npx prisma generate

# Copy source
COPY . .

# Build (NODE_ENV=production enables Secure cookies)
ENV NODE_ENV=production
RUN npm run build

# ---- Runner ----
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production
# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built artifacts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/app/generated/prisma ./app/generated/prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]