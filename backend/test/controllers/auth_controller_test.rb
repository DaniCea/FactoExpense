require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  fixtures :users

  def valid_user_params(email = "gus@fring.com", password = "polloshermanos")
    { user: { name: "Gus Fring", email: email, password: password, password_confirmation: password } }
  end

  def invalid_email_user_params
    { user: { name: "Gus Fring", email: "invalid", password: "polloshermanos", password_confirmation: "polloshermanos" } }
  end

  def mismatched_password_params
    { user: { name: "Gus Fring", email: "gus@fring.com", password: "polloshermanos", password_confirmation: "different" } }
  end

  # POST /signup
  test "should sign up a user and return a JWT token" do
    post signup_url, params: valid_user_params

    assert_response :created
    json_response = JSON.parse(response.body)

    assert json_response["token"].present?
    assert_equal "Gus Fring", json_response["user"]["name"]
    assert_equal "gus@fring.com", json_response["user"]["email"]
  end

  test "should not sign up a user with different password and password_confirmation" do
    post signup_url, params: mismatched_password_params

    assert_response :unprocessable_entity  # corrected to :unprocessable_entity
    json_response = JSON.parse(response.body)

    assert_equal "Password confirmation doesn't match Password", json_response["errors"].first
  end

  test "should not sign up a user with an invalid email" do
    post signup_url, params: invalid_email_user_params

    assert_response :unprocessable_entity  # corrected to :unprocessable_entity
    json_response = JSON.parse(response.body)

    assert_equal "Email is not a valid email address", json_response["errors"].first
  end

  # POST /signin
  test "should sign in a user and return a JWT token" do
    user = users(:one)

    post signin_url, params: { email: user.email, password: "breakingbad" }

    assert_response :ok
    json_response = JSON.parse(response.body)

    assert json_response["token"].present?
    assert_equal user.name, json_response["user"]["name"]
    assert_equal user.email, json_response["user"]["email"]
  end

  test "should not sign in with incorrect credentials" do
    post signin_url, params: { email: "nonexistent@example.com", password: "wrongpassword" }

    assert_response :unauthorized
    json_response = JSON.parse(response.body)

    assert json_response["errors"].include?("Invalid email or password")
  end
end
