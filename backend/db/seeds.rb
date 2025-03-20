# db/seeds.rb

# Creating some default tenants and users
tenant = Tenant.create!(name: 'Tenant 1')
tenant2 = Tenant.create!(name: 'Tenant 2')
user = User.create!(name: 'Test tenant 1', email: 'user1@test.com', password: 'test', tenant: tenant)
User.create!(name: 'Test admin tenant 1', email: 'admin1@test.com', password: 'test', role: 'admin', tenant: tenant)
User.create!(name: 'Test tenant 2', email: 'user2@test.com', password: 'test', tenant: tenant2)
User.create!(name: 'Test admin tenant 2', email: 'admin2@test.com', password: 'test', role: 'admin', tenant: tenant2)

accommodation = AccommodationTravelExpense.create!(
  hotel_name: 'Hotel ABC',
  check_in_date: '2025-03-01',
  check_out_date: '2025-03-05'
)

travel_expense_accommodation = TravelExpense.create!(
  trip_id: 1,
  travel_expenseable: accommodation
)

transportation = TransportationTravelExpense.create!(
  transportation_mode: 'Flight',
  route: 'NYC to LA'
)

travel_expense_transportation = TravelExpense.create!(
  trip_id: 2,
  travel_expenseable: transportation
)

travel_expense_other = TravelExpense.create!(
  trip_id: 1,
  travel_expenseable: nil
)

mileage_expense = MileageExpense.create!(
  mileage_in_km: 120.5
)

Expense.create!(
  tenant: tenant,
  user: user,
  title: 'Travel Expense - Accommodation',
  description: 'Example of a Travel expense subtype Accommodation',
  amount: 100.0,
  status: 'pending',
  expenseable: travel_expense_accommodation
)

Expense.create!(
  tenant: tenant,
  user: user,
  title: 'Travel Expense - Transportation',
  description: 'Example of a Travel expense subtype Transportation',
  amount: 150.0,
  status: 'pending',
  expenseable: travel_expense_transportation
)

Expense.create!(
  tenant: tenant,
  user: user,
  title: 'Travel Expense - Other',
  description: 'Example of a Travel expense with no extra data',
  amount: 150.0,
  status: 'pending',
  expenseable: travel_expense_other
)

Expense.create!(
  tenant: tenant,
  user: user,
  title: 'Mileage Expense 1',
  description: 'Should have mileage data associated',
  amount: 50.0,
  status: 'accepted',
  expenseable: mileage_expense
)

Expense.create!(
  tenant: tenant,
  user: user,
  title: 'Regular Expense',
  description: 'No extra data associated',
  amount: 50.0,
  status: 'accepted',
  expenseable: nil
)


puts "Seed data created successfully!"