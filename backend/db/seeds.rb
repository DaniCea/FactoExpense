# db/seeds.rb

# Creating some default tenants and users
tenant = Tenant.create!(name: 'Tenant 1')
tenant2 = Tenant.create!(name: 'Tenant 2')
user = User.create!(name: 'Test tenant 1', email: 'test1@test.com', password: 'test', tenant: tenant)
user2 = User.create!(name: 'Test tenant 2', email: 'test2@test.com', password: 'test', tenant: tenant2)


travel_expense1 = TravelExpense.create!(
  sub_type: 'accommodation'
)

AccommodationTravelExpense.create!(
  travel_expense: travel_expense1,
  hotel_name: 'Hotel ABC',
  check_in_date: '2025-03-01',
  check_out_date: '2025-03-05'
)

travel_expense2 = TravelExpense.create!(
  sub_type: 'transportation'
)

TransportationTravelExpense.create!(
  travel_expense: travel_expense2,
  transportation_mode: 'Flight',
  route: 'NYC to LA'
)

mileage_expense = MileageExpense.create!(
  mileage_in_km: 120.5
)

Expense.create!(
  tenant: tenant,
  user: user,
  title: 'Travel Expense 1',
  description: 'Should have travel data associated',
  amount: 100.0,
  status: 'pending',
  expenseable: travel_expense1
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