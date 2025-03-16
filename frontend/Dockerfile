FROM node:23

WORKDIR /app

# Install OpenSSL and other necessary dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only necessary files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Generate SSL certificate dynamically for the frontend
RUN openssl req -x509 -newkey rsa:2048 -keyout /app/ssl/server.key \
        -out /app/ssl/server.crt -days 365 -nodes -subj "/CN=localhost" && \
    # Set proper permissions for SSL files
    chown -R 1000:1000 /app/ssl
# Expose the port that Vite will run on (by default, Vite runs on 3000)
EXPOSE 3000

# Run the app with HTTPS enabled
# CMD ["pnpm", "dev"]
CMD ["bash", "-c", "pnpm dev || tail -f /dev/null"]