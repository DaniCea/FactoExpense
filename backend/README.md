# FactoExpense frontend

## Prerequisites

- Ruby 
- Rails 8
- MySQL 8 running at the default port

## Database Setup

Generates the necessary user and databases

```sh
mysql -u root -p < ../config/db/init.sql
```

## Installation

```sh
bundle install
bin/rails s
```

## Testing

```sh
bin/rails test
```

