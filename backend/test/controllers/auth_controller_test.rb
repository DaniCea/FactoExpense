require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  fixtures :users, :tenants  # Make sure tenants are included in the fixtures

  # POST /signup
  test "should sign up a user and return a JWT token" do
    post "/signup", params: { user: { name: "Gus Fring", email: "newmail@fring.com", password: "pollohermano" } }

    assert_response :created
    json_response = JSON.parse(response.body)

    assert json_response["token"].present?
    assert_equal "Gus Fring", json_response["user"]["name"]
    assert_equal "newmail@fring.com", json_response["user"]["email"]
    assert_equal "employee", json_response["user"]["role"]
  end

  test "should not sign up a user with an invalid email" do
    post "/signup", params: { user: { name: "Gus Fring", email: "invalid", password: "polloshermanos" } }

    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)

    assert_equal "Email is not a valid email address", json_response["errors"].first
  end

  # POST /signin
  test "should sign in a user and return a JWT token" do
    user = users(:user_tenant_one)

    post "/signin", params: { email: user.email, password: "breakingbad" }

    assert_response :ok
    json_response = JSON.parse(response.body)

    assert json_response["token"].present?
    assert_equal user.name, json_response["user"]["name"]
    assert_equal user.email, json_response["user"]["email"]
    assert_equal user.role, json_response["user"]["role"]
  end

  test "should not sign in with incorrect credentials" do
    post "/signin", params: { email: "nonexistent@example.com", password: "wrongpassword" }

    assert_response :unauthorized
    json_response = JSON.parse(response.body)

    assert json_response["errors"].include?("Invalid email or password")
  end
end
