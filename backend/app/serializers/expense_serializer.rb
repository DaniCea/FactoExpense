class ExpenseSerializer < ActiveModel::Serializer
  attributes :title, :description, :amount, :status, :expenseable_type, :expenseable_id

  belongs_to :expenseable, polymorphic: true
end
