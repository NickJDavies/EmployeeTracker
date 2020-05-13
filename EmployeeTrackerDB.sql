DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
USE business_db;

CREATE TABLE departments (
	id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (ID)
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
    FOREIGN KEY (role_id) REFERENCES roles(id),
    PRIMARY KEY (id)
);