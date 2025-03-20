# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_17_164549) do
  create_table "accommodation_travel_expenses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "hotel_name"
    t.date "check_in_date"
    t.date "check_out_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "expenses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "tenant_id", null: false
    t.bigint "user_id", null: false
    t.string "title", null: false
    t.string "description"
    t.decimal "amount", precision: 10, scale: 2, default: "0.0", null: false
    t.integer "status", default: 0
    t.string "expenseable_type"
    t.bigint "expenseable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["expenseable_type", "expenseable_id"], name: "index_expenses_on_expenseable"
    t.index ["tenant_id"], name: "index_expenses_on_tenant_id"
    t.index ["user_id"], name: "index_expenses_on_user_id"
  end

  create_table "mileage_expenses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.decimal "mileage_in_km", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tenants", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transportation_travel_expenses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "transportation_mode"
    t.string "route"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "travel_expenses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "trip_id"
    t.string "travel_expenseable_type"
    t.bigint "travel_expenseable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["travel_expenseable_type", "travel_expenseable_id"], name: "index_travel_expenses_on_travel_expenseable"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email", null: false
    t.string "password_digest"
    t.bigint "tenant_id", null: false
    t.integer "role", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["tenant_id"], name: "index_users_on_tenant_id"
  end

  add_foreign_key "expenses", "tenants"
  add_foreign_key "expenses", "users"
  add_foreign_key "users", "tenants"
end
