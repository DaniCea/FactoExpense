class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :amount, :status, :expenseable_type, :created_at

  belongs_to :expenseable, polymorphic: true
end
