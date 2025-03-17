class AccommodationTravelExpense < ApplicationRecord
  belongs_to :travel_expense

  validates :hotel_name, presence: true
  validates :check_in_date, :check_out_date, presence: true
end