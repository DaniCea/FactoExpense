class TravelExpenseSerializer < ActiveModel::Serializer
  attributes :travel_expenseable_type, :travel_expenseable_id

  belongs_to :travel_expenseable, polymorphic: true do
    object.travel_expenseable
  end
end