FROM node:22.17.1-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

FROM node:22.17.1-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
