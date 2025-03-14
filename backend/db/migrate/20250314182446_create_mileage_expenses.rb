class CreateMileageExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :mileage_expenses do |t|
      t.references :expense, null: false, foreign_key: true
      t.float :mileage_km
      t.float :amount

      t.timestamps
    end
  end
end
