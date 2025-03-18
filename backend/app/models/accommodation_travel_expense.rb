class AccommodationTravelExpense < ApplicationRecord
  has_one :travel_expense, as: :travel_expenseable

  validates :hotel_name, presence: true
  validates :check_in_date, :check_out_date, presence: true
end