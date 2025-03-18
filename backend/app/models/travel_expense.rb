class TravelExpense < ApplicationRecord
  has_one :expense, as: :expenseable

  has_one :accommodation_travel_expense, dependent: :destroy
  has_one :transportation_travel_expense, dependent: :destroy

  validates :sub_type, inclusion: { in: %w[accommodation transportation other] }
end