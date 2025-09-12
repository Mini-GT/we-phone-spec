FROM oven/bun:1.2-alpine

WORKDIR /app

# RUN apt-get update -y && apt-get install -y openssl \
#     ca-certificates \
#     unzip \
#     && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Generate Prisma client
RUN bunx prisma generate

EXPOSE 3000
CMD ["bun", "start"]

# found issue in latest version. fix(https://github.com/oven-sh/bun/issues/17913)
# downgrade to stable
# FROM oven/bun:1.1.38

# WORKDIR /app

# # openSSL for prisma/mongoDB)
# RUN apt-get update -y && apt-get install -y openssl \
#     ca-certificates \
#     unzip \
#     && rm -rf /var/lib/apt/lists/*

# COPY package.json bun.lock ./
# RUN bun install --frozen-lockfile

# # Copy the rest of the code
# COPY . .

# # Generate Prisma client
# RUN bunx prisma generate

# EXPOSE 3000

# # Start the Bun app
# CMD ["bun", "start"]