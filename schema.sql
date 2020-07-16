DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE Departments (
  dept_id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE Roles (
  role_id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  dept_id INT ,
  PRIMARY KEY (role_id)
  
);

CREATE TABLE Employees (
  emp_id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT ,
  manager_id INT NULL,
  PRIMARY KEY (emp_id)
  
);