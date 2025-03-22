# FactoExpense

## Installation

### With Docker-Compose (prefered)

Ensure you have the latest version of [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/).

Once Docker and Docker Compose are installed, you can easily build and start the application using the following command:

```sh
docker-compose up --build
```

This will automatically build and start the application containers.

### Locally

To run the project locally you must enable SSL. This is necessary because the application uses secure cookies for authentication, which requires the use of HTTPS.

To enable SSL locally, you will need to manually inject the SSL certificates into both the frontend and backend. Use the following commands:

```sh
cp -r config/ssl/* backend/config/ssl
cp -r config/ssl/* frontend/config/ssl
```

Next, follow the instructions in the frontend and backend readme:

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## Usage

Once the application is running, you can access it via https://localhost:5173/. You can sign in using one of the four default users below:

### Tenant 1:
- **User 1**: `user1@test.com` / `test`
- **Admin 1**: `admin1@test.com` / `test`

### Tenant 2:
- **User 2**: `user2@test.com` / `test`
- **Admin 2**: `admin2@test.com` / `test`

All users created via the signup form will default to **Tenant 1**.

## Roadmap

This project aims to be simple and compact. However, there are several improvements that can be made to move towards a more production-ready version. Here's a list of potential improvements:

### Frontend
- Add paginaton to the `ExpenseList` component.
- Improve mobile responsiveness for a better user experience on small screens.
- Complete unit testing for components, forms, and pages. [Example of tested component](./frontend/src/components/forms/NewExpenseForm/NewExpenseForm.test.tsx).

### Backend
- Implement pagination for the `GET /expenses` endpoint to improve performance with large data sets.
- Complete backend testing. Example of tested [controller](./backend/test/controllers/auth_controller_test.rb) and [model](./backend/test/models/user_test.rb).

### Database
- The current `password_digest` field in the User table enforces a 1-to-1 relationship between users and authentication methods. This currently doesn't allow users to log in via both password and OAuth. Consider adding support for OAuth or alternative auth methods alongside the existing password authentication.
- Transition to a many-to-many relationship between Users and Tenants to enable multi-tenancy support, allowing accounts to be associated with multiple tenants.
- Create a table for Trips, as `trip_id` currently references nothing. This will help better track trips associated with travel expenses.
- Introduce a Status table to track historical status changes for expenses. This could provide a useful audit trail.
- Refactor the multi-level polymorphic relationship for `TravelExpenses`. Ideally, Accommodation and Transportation travel expenses should be stored as metadata within an `Expense` record instead of using polymorphic relationships.

### General
- Implement integration testing using frameworks like Playwright, which would ensure the application behaves correctly in a real-world environment.
- Build CI/CD pipelines to automate testing, deployment, and ensure smooth continuous integration and delivery for both the frontend and backend.
