FROM node:23

WORKDIR /app

# Install OpenSSL and other necessary dependencies
RUN apt-get update -qq && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only necessary files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the port that Vite will run on (by default, Vite runs on 3000)
EXPOSE 3000

# Run the app with HTTPS enable
CMD ["pnpm", "dev"]
# CMD ["bash", "-c", "pnpm dev || tail -f /dev/null"]