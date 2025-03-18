class TravelExpense < ApplicationRecord
  has_one :expense, as: :expenseable

  belongs_to :travel_expenseable, polymorphic: true, optional: true

  validates :sub_type, inclusion: { in: %w[accommodation transportation other] }
end