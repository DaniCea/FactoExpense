class TransportationTravelExpense < ApplicationRecord
  has_one :travel_expense, as: :travel_expenseable

  validates :transportation_mode, presence: true
  validates :route, presence: true
end