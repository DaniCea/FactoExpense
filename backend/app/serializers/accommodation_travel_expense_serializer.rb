class AccommodationTravelExpenseSerializer < ActiveModel::Serializer
  attributes :id, :hotel_name, :check_in_date, :check_out_date
end
