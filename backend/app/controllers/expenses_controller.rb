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

    # Manually adjust the response to include `travel_expenseable` for only TravelExpense
    expenses_with_associations = expenses.map do |expense|
      if expense.expenseable.is_a?(TravelExpense)
        expense.as_json(include: { expenseable: { include: :travel_expenseable } })
      elsif expense.expenseable.is_a?(MileageExpense)
        expense.as_json(include: { expenseable: {} })
      else
        expense.as_json
      end
    end

    # TODO: Add pagination

    render json: expenses_with_associations, status: :ok
  end

  # POST /expenses
  def create
    # Start a transaction to ensure data consistency
    ActiveRecord::Base.transaction do
      expenseable = nil
      travel_expenseable = nil

      expense = Expense.new(expense_params)
      expense.tenant = @current_tenant
      expense.user = @current_user
      expense.status = "pending"

      if params[:expense_type].to_s.downcase == 'travel'
        if params[:travel_expense_type].to_s.downcase == 'accommodation'
          travel_expenseable = AccommodationTravelExpense.create!(
            hotel_name: params[:hotel_name],
            check_in_date: params[:check_in_date],
            check_out_date: params[:check_out_date]
          )
          puts "Entro en Travel - Accommodation"
          puts "TravelExpenseable: #{travel_expenseable.inspect}"
          expenseable = TravelExpense.create!(travel_expenseable: travel_expenseable)
          puts "Expenseable: #{expenseable.inspect}"

        elsif params[:travel_expense_type].to_s.downcase == 'transportation'
          travel_expenseable = TransportationTravelExpense.create!(
            transportation_mode: params[:transportation_mode],
            route: params[:route]
          )
          puts "Entro en Travel - Transportation"
          puts "TravelExpenseable: #{travel_expenseable.inspect}"
          expenseable = TravelExpense.create!(travel_expenseable: travel_expenseable)
          puts "Expenseable: #{expenseable.inspect}"
        else
          puts "Entro en Travel - Other"
          expenseable = TravelExpense.create!
          puts "Expenseable: #{expenseable.inspect}"
        end
      end

      if params[:expense_type].to_s.downcase == 'mileage'
        expenseable = MileageExpense.new(mileage_in_km: params[:mileage_in_km])
        expense.amount = calculate_expense_amount(expenseable) # Simulate price calculation and refresh price
      end

      puts " ----  Estamos fuera ----- "
      puts "Expenseable: #{expenseable.inspect}"
      expense.expenseable = expenseable
      puts "Expense: #{expenseable.inspect}"

      if expense.save
        render json: expense, status: :created
      else
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

  # Method to simulate the expense amount calculation based on the mileage, ideally this would run in another class or service
  def calculate_expense_amount(expenseable)
    rate_per_km = rand(0.20..0.80).round(2) # Simulation of rate per km
    expenseable.mileage_in_km * rate_per_km
  end

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
