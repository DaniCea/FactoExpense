class CreateTravelExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :travel_expenses do |t|
      t.references :expense, null: false, foreign_key: true
      t.string :sub_type

      t.timestamps
    end
  end
end
