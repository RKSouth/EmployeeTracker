DROP DATABASE IF EXISTS  employeetracker_db;
CREATE database employeetracker_db;

USE employeetracker_db;

-- CREATE TABLE top5000 changed to department
CREATE TABLE department (
deptid INT AUTO_INCREMENT PRIMARY KEY,
deptname VARCHAR(30) UNIQUE NOT NULL
);
-- CREATE TABLE top_albums ( changed to roles
CREATE TABLE roles (
  addid INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(deptid) ON DELETE CASCADE
);

CREATE TABLE employee (
  empid INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(addid) ON DELETE CASCADE,
  manager_id INT, 
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(empid) ON DELETE SET NULL
);
INSERT INTO department ( deptname)
VALUES ("kitchen");
INSERT INTO roles (title, salary, department_id)
VALUES ( "chef", 400, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ( "kitchen assistant", 3000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Snail", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "", 2, 1);




SELECT * FROM department;
SELECT * from roles;
SELECT * from employee;
