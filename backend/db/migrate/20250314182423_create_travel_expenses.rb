class CreateTravelExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :travel_expenses do |t|
      t.references :expense, null: false, foreign_key: true
      t.string :sub_type
      t.string :hotel_name
      t.date :check_in_date
      t.date :check_out_date
      t.string :transportation_mode
      t.string :route

      t.timestamps
    end
  end
end
