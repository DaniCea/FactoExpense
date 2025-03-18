class CreateAccommodationTravelExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :accommodation_travel_expenses do |t|
      t.string :hotel_name
      t.date :check_in_date
      t.date :check_out_date

      t.timestamps
    end
  end
end
