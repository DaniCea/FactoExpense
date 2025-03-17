class TransportationTravelExpense < ApplicationRecord
  belongs_to :travel_expense

  validates :transportation_mode, presence: true
  validates :route, presence: true
end