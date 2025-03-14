class TravelExpense < ApplicationRecord
  belongs_to :expense

  validates :hotel_name, presence: true, if: -> { sub_type == 'accommodation' }
  validates :transportation_mode, presence: true, if: -> { sub_type == 'transportation' }
end
