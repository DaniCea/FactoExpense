class TravelExpenseSerializer < ActiveModel::Serializer
  attributes :trip_id, :travel_expenseable_type

  belongs_to :travel_expenseable, polymorphic: true do
    object.travel_expenseable
  end
end