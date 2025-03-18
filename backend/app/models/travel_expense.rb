class TravelExpense < ApplicationRecord
  has_one :expense, as: :expenseable

  belongs_to :travel_expenseable, polymorphic: true, optional: true
end