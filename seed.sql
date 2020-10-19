
-- DROP DATABASE IF EXISTS  employeetracker_db;
CREATE database employeetracker_db;

USE employeetracker_db;

-- CREATE TABLE top5000 changed to department
CREATE TABLE department (
id INT PRIMARY KEY,
deptname VARCHAR(30)
);
-- CREATE TABLE top_albums ( changed to roles
CREATE TABLE roles (
--   position INT NOT NULL,
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT NOT NULL
);

CREATE TABLE employee (

  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT(30)
);
INSERT INTO department (id, deptname)
VALUES (13 , "kitchen");
INSERT INTO roles (id, title, salary, department_id)
VALUES (120 , "chef", 300, 12);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1201 , "Bentley", "Kelm-Southworth", 120, 3);


SELECT * FROM department;
SELECT * from roles;
SELECT * from employee;