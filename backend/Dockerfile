FROM ruby:3.4.2

# Rails app lives here
WORKDIR /rails

# Install base packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl default-mysql-client libjemalloc2 libvips openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install dockerize
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential default-libmysqlclient-dev git libyaml-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .
# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Generate SSL certificate dynamically
RUN mkdir -p /rails/config/ssl && \
    openssl req -x509 -newkey rsa:2048 -keyout /rails/config/ssl/server.key \
        -out /rails/config/ssl/server.crt -days 365 -nodes -subj "/CN=localhost" && \
    # Set proper permissions for SSL files
    chown -R 1000:1000 /rails/config/ssl

# Create necessary directories if they do not exist
# Run and own only the runtime files as a non-root user for security
RUN mkdir -p db log storage tmp
#RUN mkdir -p db log storage tmp && \
#    groupadd --system --gid 1000 rails && \
#    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
#    chown -R rails:rails db log storage tmp

USER 1000:1000

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Expose HTTPS port
EXPOSE 443

# Start server with HTTPS enabled
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
