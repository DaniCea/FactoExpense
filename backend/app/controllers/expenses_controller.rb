class ExpensesController < ApplicationController
  before_action :authorize_admin, only: [:update_status]

  # GET /expenses
  def index
    expenses = Expense.where(tenant: @current_tenant)

    # Filter by status
    if params[:status].present?
      expenses = expenses.where(status: params[:status])
    end

    # Filter by date range
    if params[:from].present? && params[:to].present?
      expenses = expenses.where(created_at: Date.parse(params[:from]).beginning_of_day..Date.parse(params[:to]).end_of_day)
    elsif params[:from].present?
      expenses = expenses.where('created_at >= ?', Date.parse(params[:from]).beginning_of_day)
    elsif params[:to].present?
      expenses = expenses.where('created_at <= ?', Date.parse(params[:to]).end_of_day)
    end

    # Eager load associations based on the expense type
    expenses = expenses.includes(:expenseable)

    # TODO: Add pagination

    render json: expenses.as_json(
      include: { expenseable: {} }
    ), status: :ok
  end

  # POST /expenses
  def create
    # Start a transaction to ensure data consistency
    ActiveRecord::Base.transaction do
      expenseable = nil

      if params[:expense_type].to_s.downcase == 'travel'
        # Create a TravelExpense and populate with required details
        expenseable = TravelExpense.new(sub_type: params[:sub_type])
        # If you're creating other details like Accommodation or Transportation, you can add that here.
        # Example: expenseable.accommodation_travel_expense = AccommodationTravelExpense.new(hotel_name: 'Hotel ABC')

      elsif params[:expense_type].to_s.downcase == 'mileage'
        # Create a MileageExpense
        expenseable = MileageExpense.new(mileage_in_km: params[:mileage_in_km])
      end

      # Create the main expense
      expense = Expense.new(expense_params)
      expense.tenant = @current_tenant
      expense.user = @current_user
      expense.status = "pending"

      # Assign the polymorphic relationship with the expenseable object
      expense.expenseable = expenseable

      # Save the expense and the associated records
      if expense.save
        render json: expense, status: :created
      else
        # Rollback transaction if anything fails
        render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    end
  end

  # PATCH /expenses/:id/status
  def update_status
    expense = Expense.find(params[:id])

    # Only update the status field
    if expense.update(status: status_param)
      render json: expense, status: :ok
    else
      render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # Method to check if the user is an admin
  def authorize_admin
    unless @current_user.role == 'admin'
      render json: { errors: ["Unauthorized action. Admins only."] }, status: :unauthorized
    end
  end

  def status_param
    params.require(:status)
  end

  private

  # Strong parameters for expense
  def expense_params
    params.require(:expense).permit(:expense_type, :title, :description, :amount).reverse_merge(amount: 0) # Expenses without amount have their amount set to 0 and calculated later
  end

  # Strong parameters for TravelExpense
  def travel_expense_params
    params.require(:travel_expense).permit(:sub_type, :hotel_name, :check_in_date, :check_out_date, :transportation_mode, :route)
  end

end
