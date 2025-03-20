class CreateTravelExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :travel_expenses do |t|
      t.integer :trip_id, null: true
      t.belongs_to :travel_expenseable, polymorphic: true

      t.timestamps
    end
  end
end
