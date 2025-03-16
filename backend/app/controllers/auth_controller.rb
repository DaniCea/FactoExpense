class AuthController < ApplicationController
  skip_before_action :authenticate_user, only: [:signup, :signin]

  # POST /signup
  def signup
    user = User.new(user_params)
    user.tenant = Tenant.find_or_create_by(id: 1, name: "Default Tenant") # TODO: Think of a better way

    if user.save
      token = encode_token({ user_id: user.id, tenant_id: user.tenant_id })
      render json: { token: token, user: user.as_json(only: [:id, :name, :email]) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /signin
  def signin
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      token = encode_token({ user_id: user.id, tenant_id: user.tenant_id })

      cookies[:_auth] = {
        value: token,
        httponly: true,  # Helps prevent JavaScript access to the cookie
        secure: true,  # Only send over HTTPS in production
        same_site: :off,  # TODO: This is the best?
        expires: 1.hour.from_now # Set an expiration time for the cookie
      }

      render json: { token: token, user: user.as_json(only: [:id, :name, :email]) }, status: :ok
    else
      render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secret_key_base, 'HS256')
  end
end