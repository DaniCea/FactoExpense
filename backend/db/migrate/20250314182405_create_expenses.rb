class CreateExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :expenses do |t|
      t.references :tenant, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.string :description
      t.decimal :amount, precision: 10, scale: 2, null: false, default: 0.0
      t.string :status, default: 'pending'

      t.belongs_to :expenseable, polymorphic: true

      t.timestamps
    end
  end
end
