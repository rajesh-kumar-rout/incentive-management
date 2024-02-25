CREATE DATABASE incentive_management;

USE `incentive_management`;

CREATE TABLE customers (
    `id` BIGINT(20) AUTO_INCREMENT,
    `adhar_no` BIGINT(12) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
);

CREATE TABLE employees(
    `id` BIGINT(20) AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(20) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` BOOLEAN DEFAULT False,
    `is_active` BOOLEAN DEFAULT True,
    PRIMARY KEY (`id`)
);

CREATE TABLE holiday_packages(
    `id` BIGINT(20) AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `duration` INT NOT NULL,
    `destination` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE amenities(
    `id` BIGINT(20) AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `holiday_package_id` BIGINT(20),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`holiday_package_id`) REFERENCES `holiday_packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE incentives(
    `id` BIGINT(20) AUTO_INCREMENT,
    `percentage` FLOAT,
    `bonus` INT,
    `holiday_package_id` BIGINT(20),
    `employee_id` BIGINT(20),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`holiday_package_id`) REFERENCES `holiday_packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE products(
    `id` BIGINT(20) AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE sales (
    `id` BIGINT(20) AUTO_INCREMENT,
    `customer_id` BIGINT(20),
    `employee_id` BIGINT(20),
    `product_id` BIGINT(20),
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`id`)
);

CREATE TABLE auth_tokens (
    `token` VARCHAR(255),
    `employee_id` BIGINT(20),
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `products` (`name`) VALUES ('Product 1'), ('Product 2'), ('Product 3'), ('Product 4'), ('Product 5');
INSERT INTO `employees` (`name`, `email`, `password`, `is_admin`) VALUES 
('John', 'john@gmail.com', '123456aA@', 1),
('smitch', 'smitch@gmail.com', '123456aA@', 1),
('ram', 'ram@gmail.com', '123456aA@', 0),
('sam', 'sam@gmail.com', '123456aA@', 0);