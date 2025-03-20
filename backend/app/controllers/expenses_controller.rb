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

    # TODO: Add pagination

    render json: expenses, include: "**", each_serializer: ExpenseSerializer, status: :ok
  end

  # POST /expenses
  def create
    expense = nil

    ActiveRecord::Base.transaction do
      expense = ExpenseFactory.build(params, @current_tenant, @current_user)
      expense.amount = calculate_expense_amount(expense.expenseable) if expense.expenseable.is_a?(MileageExpense)

      unless expense.save
        render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    end

    render json: expense, serializer: ExpenseSerializer, include: "**", status: :created
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

  # Method to simulate the expense amount calculation based on the mileage, ideally this would run in another class or service
  def calculate_expense_amount(expenseable)
    rate_per_km = rand(0.20..0.80).round(2) # Simulation of amount calculation
    expenseable.mileage_in_km * rate_per_km
  end

  # Method to check if the user is an admin
  def authorize_admin
    unless @current_user.admin?
      render json: { errors: [ "Unauthorized action. Admins only." ] }, status: :unauthorized
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
    params.require(:travel_expense).permit(:trip_id, :hotel_name, :check_in_date, :check_out_date, :transportation_mode, :route)
  end
end