class AuthController < ApplicationController
  skip_before_action :authenticate_user, only: [:signup, :signin]

  # POST /signup
  def signup
    user = User.new(user_params)
    user.tenant = Tenant.find(1) # Assign the user to the default tenant

    if user.save
      token = encode_token({ user_id: user.id, tenant_id: user.tenant_id, exp: 1.year.from_now.to_i })
      cookies[:_auth] = {
        value: token,
        secure: true,  # Only send over HTTPS in production
        same_site: :none,  # Allow cross-site cookies
        expires: 1.week.from_now # Set an expiration time for the cookie
      }

      render json: { token: token, user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /signin
  def signin
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      token = encode_token({ user_id: user.id, tenant_id: user.tenant_id, exp: 1.year.from_now.to_i })

      cookies[:_auth] = {
        value: token,
        secure: true,  # Only send over HTTPS in production
        same_site: :none,  # Allow cross-site cookies
        expires: 1.week.from_now # Set an expiration time for the cookie
      }

      render json: { token: token, user: user }, status: :ok
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