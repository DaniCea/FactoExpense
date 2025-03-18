class CreateMileageExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :mileage_expenses do |t|
      t.decimal :mileage_in_km, precision: 10, scale: 2, null: false

      t.timestamps
    end
  end
end
