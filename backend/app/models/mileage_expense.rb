class MileageExpense < ApplicationRecord
  belongs_to :expense

  validates :mileage_in_km, numericality: { greater_than_or_equal_to: 0 }

  after_save :calculate_expense_amount

  private


  def calculate_expense_amount
    rate_per_km = rand(0.20..0.80).round(2) # Simulation of rate per km
    total_amount = self.mileage_in_km * rate_per_km

    # Update the associated expense with the calculated amount
    self.expense.update(amount: total_amount)
  end
end
