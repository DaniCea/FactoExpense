CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';

CREATE DATABASE IF NOT EXISTS backend_development;
CREATE DATABASE IF NOT EXISTS backend_test;

GRANT ALL PRIVILEGES ON backend_development.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON backend_test.* TO 'user'@'%';

FLUSH PRIVILEGES;