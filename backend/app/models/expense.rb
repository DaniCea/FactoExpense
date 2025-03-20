class Expense < ApplicationRecord
  enum :status, [ :pending, :accepted, :rejected ]

  belongs_to :tenant
  belongs_to :user

  belongs_to :expenseable, polymorphic: true, optional: true

  validates :status, presence: true
end
