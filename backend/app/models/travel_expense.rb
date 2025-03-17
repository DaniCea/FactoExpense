class TravelExpense < ApplicationRecord
  belongs_to :expense

  has_one :accommodation_travel_expense, dependent: :destroy
  has_one :transportation_travel_expense, dependent: :destroy

  validates :sub_type, inclusion: { in: %w[accommodation transportation other] }
end