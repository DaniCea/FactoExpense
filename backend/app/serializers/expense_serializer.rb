class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :amount, :status, :expenseable_type, :expenseable_id, :created_at

  belongs_to :expenseable, polymorphic: true
end
