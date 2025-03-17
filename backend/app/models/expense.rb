class Expense < ApplicationRecord
  belongs_to :tenant
  belongs_to :user

  has_one :travel_expense, dependent: :destroy
  has_one :mileage_expense, dependent: :destroy

  validates :status, inclusion: { in: %w[pending accepted rejected] }
  validates :expense_type, inclusion: { in: %w[regular travel mileage] }

  def as_json(options = {})
    json = super(options)

    if expense_type == "travel" && travel_expense.present?
      json[:travel_expense] = travel_expense.as_json(options.merge(
        include: {
          accommodation_travel_expense: {},
          transportation_travel_expense: {}
        }
      ))
    end

    if expense_type == "mileage" && mileage_expense.present?
      json[:mileage_expense] = mileage_expense.as_json
    end

    json
  end
end
