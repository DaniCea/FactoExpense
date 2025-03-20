class ExpenseFactory
  EXPENSE_TYPES = {
    travel: "travel",
    mileage: "mileage"
  }

  TRAVEL_EXPENSE_TYPES = {
    accommodation: "accommodation",
    transportation: "transportation"
  }

  def self.build(params, tenant, user)
    expenseable = nil

    case params[:expense_type].to_s.downcase
    when EXPENSE_TYPES[:travel]
      expenseable = create_travel_expense(params)
    when EXPENSE_TYPES[:mileage]
      expenseable = MileageExpense.new(mileage_in_km: params[:mileage_in_km])
    end

    Expense.new(
      title: params[:title],
      description: params[:description],
      amount: params[:amount],
      status: Expense.statuses[:pending],
      expenseable: expenseable,
      tenant: tenant,
      user: user
    )
  end

  private

  def self.create_travel_expense(params)
    travel_expenseable = case params[:travel_expense_type].to_s.downcase
                         when TRAVEL_EXPENSE_TYPES[:accommodation]
                           AccommodationTravelExpense.create!(
                             hotel_name: params[:hotel_name],
                             check_in_date: params[:check_in_date],
                             check_out_date: params[:check_out_date]
                           )
                         when TRAVEL_EXPENSE_TYPES[:transportation]
                           TransportationTravelExpense.create!(
                             transportation_mode: params[:transportation_mode],
                             route: params[:route]
                           )
                         else
                           nil
                         end
    TravelExpense.create!(trip_id: params[:trip_id], travel_expenseable: travel_expenseable)
  end
end