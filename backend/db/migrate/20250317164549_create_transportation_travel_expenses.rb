class CreateTransportationTravelExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :transportation_travel_expenses do |t|
      t.string :transportation_mode
      t.string :route

      t.timestamps
    end
  end
end
