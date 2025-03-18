class Expense < ApplicationRecord
  belongs_to :tenant
  belongs_to :user

  belongs_to :expenseable, polymorphic: true, optional: true

  validates :status, inclusion: { in: %w[pending accepted rejected] }
end
