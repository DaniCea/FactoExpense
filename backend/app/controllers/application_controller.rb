class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user

  def authenticate_user
    token = cookies[:_auth]

    if token.blank?
      render json: { errors: ["Unauthorized"] }, status: :unauthorized
      return
    end

    begin
      decoded_token = decode_token(token)
      @current_user = User.find(decoded_token[:user_id])
      @current_tenant = Tenant.find(decoded_token[:tenant_id])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { errors: ["Unauthorized"] }, status: :unauthorized
    end
  end

  private

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base, "HS256")
  end

  def decode_token(token)
    decoded = JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: "HS256" })[0]
    HashWithIndifferentAccess.new(decoded)
  end
end
