require "test_helper"

class ExpensesControllerTest < ActionDispatch::IntegrationTest
  # Setup test data
  setup do
    @tenant = tenants(:one) # Assuming you have a fixture for tenants
    @user = users(:user_tenant_one) # Assuming you have a fixture for users
    @admin_user = users(:user_tenant_one_admin) # Admin user
    @expense = expenses(:one) # Assuming you have a fixture for expenses

    # Generate a JWT token for the admin user
    token = generate_jwt(@user, @tenant)

    # Set the cookie with the generated token (this will apply to all tests)
    cookies[:_auth] = token
  end

  def encode_token(payload)
    JWT.encode(payload, "TEST_KEY_BASE", "HS256")
  end

  # Helper method to generate a JWT token for testing
  def generate_jwt(user, tenant)
    payload = { user_id: user.id, tenant_id: tenant.id }
    encode_token(payload)
  end

  # Test for the index action
  test "should get index" do
    get expenses_url
    assert_response :success
    assert_not_nil assigns(:expenses)
  end

  test "should filter expenses by status" do
    get expenses_url, params: { status: 'approved' }
    assert_response :success
    assert_includes JSON.parse(response.body).map { |e| e['status'] }, 'approved'
  end

  test "should filter expenses by date range" do
    start_date = 1.day.ago.to_date
    end_date = Date.today
    get expenses_url, params: { dateFrom: start_date, dateTo: end_date }
    assert_response :success
    expenses = JSON.parse(response.body)
    assert expenses.any? { |e| Date.parse(e['created_at']) >= start_date && Date.parse(e['created_at']) <= end_date }
  end

  test "should get all expenses without filters" do
    get expenses_url
    assert_response :success
    expenses = JSON.parse(response.body)
    assert expenses.length > 0
  end

  # Test for the create action
  test "should create expense with valid parameters" do
    assert_difference('Expense.count', 1) do
      post expenses_url, params: { expense: { expense_type: 'travel', status: 'pending' },
                                   travel_expense: { sub_type: 'flight', hotel_name: 'Hotel XYZ', check_in_date: Date.today, check_out_date: Date.tomorrow, transportation_mode: 'plane', route: 'NYC -> LA' } }
    end
    assert_response :created
    expense = Expense.last
    assert_equal 'travel', expense.expense_type
    assert_equal 'pending', expense.status
  end

  test "should not create expense with invalid parameters" do
    assert_no_difference('Expense.count') do
      post expenses_url, params: { expense: { expense_type: '', status: '' } }
    end
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['errors'], "Expense type can't be blank"
  end

  # Test for the update_status action
  test "should update expense status if user is admin" do
    @current_user = @admin_user
    @current_tenant = @tenant
    patch update_status_expense_url(@expense), params: { status: 'approved' }
    assert_response :success
    @expense.reload
    assert_equal 'approved', @expense.status
  end

  test "should not update status if user is not admin" do
    patch update_status_expense_url(@expense), params: { status: 'approved' }
    assert_response :unauthorized
    assert_includes JSON.parse(response.body)['errors'], 'Unauthorized action. Admins only.'
  end

  test "should not update expense with invalid status" do
    @current_user = @admin_user
    patch update_status_expense_url(@expense), params: { status: nil }
    assert_response :unprocessable_entity
    assert_includes JSON.parse(response.body)['errors'], "Status can't be blank"
  end
end
