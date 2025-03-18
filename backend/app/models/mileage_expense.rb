class MileageExpense < ApplicationRecord
  has_one :expense, as: :expenseable

  validates :mileage_in_km, numericality: { greater_than_or_equal_to: 0 }
end
