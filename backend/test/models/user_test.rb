require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @tenant = tenants(:one)
    @user = User.new(
      email: "testuser@example.com",
      password: "password123",
      password_confirmation: "password123",
      tenant: @tenant
    )
  end
  
  test "should be valid with valid attributes" do
    assert @user.valid?
  end

  test "should not be valid without email" do
    @user.email = nil
    assert_not @user.valid?
  end

  test "should not be valid with duplicate email" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test "should not be valid with invalid email format" do
    invalid_emails = %w[invalid_email@com @invalid.com invalid]
    invalid_emails.each do |invalid_email|
      @user.email = invalid_email
      assert_not @user.valid?
    end
  end

  test "should not be valid without tenant" do
    @user.tenant = nil
    assert_not @user.valid?
  end

  test "should not be valid without password" do
    @user.password = @user.password = nil
    assert_not @user.valid?
  end

  # Test role assignment
  test "should have default role as employee" do
    assert_equal "employee", @user.role
  end

  test "should allow setting role to admin" do
    @user.role = :admin
    assert @user.valid?
  end

  # Test password security
  test "should authenticate with correct password" do
    @user.save
    assert @user.authenticate("password123")
  end

  test "should not authenticate with incorrect password" do
    @user.save
    assert_not @user.authenticate("wrongpassword")
  end
end