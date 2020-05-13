DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
USE business_db;

CREATE TABLE departments (
	id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(ID),
    PRIMARY KEY (id)
);

CREATE TABLE employees (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    second_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager VARCHAR(50),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager) REFERENCES employees(first_name, second_name),
    PRIMARY KEY (id)
);

INSERT INTO departments VALUES (id, "IT"), (id, "ACCOUNTING"), (id, "SALES");
INSERT INTO roles VALUES (id, "SALES LEAD", "10", "3"), (id, "SALES PERSON", "100", "3"), (id, "ACCOUNTANT", "2", "2"), (id, "IT LEAD", "200", "1");
INSERT INTO employees VALUES (id, "nick", "davies", "4", "John"), (id, "me", "me", "2", "Also John");