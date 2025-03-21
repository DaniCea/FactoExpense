class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email, null: false
      t.string :password_digest

      t.references :tenant, null: false, foreign_key: true
      t.integer :role, default: 0

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
