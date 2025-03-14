class ExpensesController < ApplicationController
  before_action :set_tenant_and_user, only: [:index, :create]

  # GET /expenses
  def index
    expenses = Expense.where(tenant: "1")  # TODO: Get tenant from Auth user, testing purposes

    # Filter by status
    if params[:status].present?
      expenses = expenses.where(status: params[:status])
    end

    # Filter by date range
    if params[:dateFrom].present? && params[:dateTo].present?
      expenses = expenses.where(created_at: params[:dateFrom]..params[:dateTo])
    elsif params[:dateFrom].present?
      expenses = expenses.where('created_at >= ?', params[:dateFrom])
    elsif params[:dateTo].present?
      expenses = expenses.where('created_at <= ?', params[:dateTo])
    end

    # Eager load associations based on the expense type
    expenses = expenses.includes(:travel_expense, :mileage_expense)

    # TODO: Add pagination

    render json: expenses, status: :ok
  end

  # POST /expenses
  def create
    # Start a transaction to ensure data consistency
    ActiveRecord::Base.transaction do
      # Create the main expense
      expense = Expense.new(expense_params)
      expense.tenant = Tenant.find(1) # TODO: Set Auth user tenant
      expense.user = User.find(1) # TODO: Set Auth user

      # If expense is a TravelExpense, create associated TravelExpense
      if expense.expense_type == "travel"
        travel_expense = expense.build_travel_expense(travel_expense_params)
      end

      # If expense is a MileageExpense, create associated MileageExpense
      if expense.expense_type == "mileage"
        mileage_expense = expense.build_mileage_expense(mileage_expense_params)
      end

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

  def status_param
    params.require(:status)
  end

  private

  # Strong parameters for expense
  def expense_params
    params.require(:expense).permit(:expense_type, :status)
  end

  # Strong parameters for TravelExpense
  def travel_expense_params
    params.require(:travel_expense).permit(:sub_type, :hotel_name, :check_in_date, :check_out_date, :transportation_mode, :route)
  end

  # Strong parameters for MileageExpense
  def mileage_expense_params
    params.require(:mileage_expense).permit(:mileage_km, :amount)
  end

  # Set the tenant and user based on the current user
  def set_tenant_and_user
    @tenant = Tenant.find(1) # TODO: Set Auth user tenant
  end
end
