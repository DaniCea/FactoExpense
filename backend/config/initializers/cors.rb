# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:5173", "http://0.0.0.0:5173", "https://localhost:5173", "https://0.0.0.0:5173" # TODO: Set from the environment variable

    resource "*",
      headers: :any,
      expose: %w[Authorization Set-Cookie],
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      credentials: true
  end
end
