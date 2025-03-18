class CreateTravelExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :travel_expenses do |t|
      t.string :sub_type

      t.timestamps
    end
  end
end
