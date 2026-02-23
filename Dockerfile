# Stage 1: Build Rust Backend
FROM rust:1.75-slim as backend-builder
WORKDIR /app
COPY src-tauri .
RUN cargo build --release

# Stage 2: Build Frontend
FROM node:20-alpine as frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY src ./src
RUN npm run build

# Stage 3: Runtime
FROM debian:bookworm-slim
WORKDIR /app

# Install Tauri dependencies (webkit2gtk, etc)
RUN apt-get update && apt-get install -y \
    libwebkit2gtk-4.0-dev \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

COPY --from=backend-builder /app/target/release/god-level-ide /app/
COPY --from=frontend-builder /app/dist /app/public

# MCP & Agent Nodes are internal services
EXPOSE 8080

CMD ["./god-level-ide"]
