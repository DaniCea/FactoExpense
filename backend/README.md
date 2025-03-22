# FactoExpense backend

## Prerequisites

Before starting the project, ensure you have the following installed:

- **Ruby**: [Download Ruby](https://www.ruby-lang.org/en/documentation/)
- **Rails 8**: [Install Rails](https://guides.rubyonrails.org/getting_started.html#installing-rails)
- **MySQL 8**: Make sure MySQL 8 is running on the default port (`3306`). You can download it from [MySQL's website](https://dev.mysql.com/downloads/installer/).


## Database Setup

You need to set up the database before running the application. Use the following command to initialize the database and create the necessary tables:

```sh
mysql -u root -p < ../config/db/init.sql
```

This will execute the init.sql script located in the config/db/ directory to set up the required users and databases for the application.

## Installation

1. Install the necessary dependencies:
    ```sh
    bundle install
    ```
2. Start the rails server
    ```sh
    bin/rails server
    ```

## Testing

Before running the tests, make sure the test database is set up:

```sh
RAILS_ENV=test bin/rails db:prepare
```

Then, to execute the tests:

```sh
bin/rails test
```

