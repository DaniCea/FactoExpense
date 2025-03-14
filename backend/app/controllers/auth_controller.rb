class AuthController < ApplicationController
  skip_before_action :authenticate_user, only: [:signup, :signin]

  # POST /signup
  def signup
    user = User.new(user_params)
    # Optionally, you can assign a tenant here if needed:
    # user.tenant = Tenant.find_by(some_identifier: params[:tenant_identifier])
    user.tenant = Tenant.find(1) # TODO: Think of a way to get this

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
      render json: { token: token, user: user.as_json(only: [:id, :name, :email]) }, status: :ok
    else
      render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end

  private

  def user_params
    # Adjust permitted attributes as needed (e.g., add tenant information if required)
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def encode_token(payload)
    # Encode the payload using your Rails secret key.
    JWT.encode(payload, Rails.application.secret_key_base, 'HS256')
  end
end