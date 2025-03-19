class TravelExpenseSerializer < ActiveModel::Serializer
  attributes :id, :travel_expenseable_type, :travel_expenseable_id

  belongs_to :travel_expenseable, polymorphic: true
end