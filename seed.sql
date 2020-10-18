-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. 
--   This field may be null if the employee has no manager

-- DROP DATABASE IF EXISTS top_songsDB; changed to employeetracker_DB
CREATE database employeetracker_db;

USE employeetracker_db;

-- CREATE TABLE top5000 changed to department
CREATE TABLE department (
--   position INT NOT NULL,
  id INT PRIMARY KEY,
  name VARCHAR(30),
--   artist VARCHAR(100) NULL,
--   song VARCHAR(100) NULL,
--   year INT NULL,
--   raw_total DECIMAL(10,4) NULL,
--   raw_usa DECIMAL(10,4) NULL,
--   raw_uk DECIMAL(10,4) NULL,
--   raw_eur DECIMAL(10,4) NULL,
--   raw_row DECIMAL(10,4) NULL,
--   PRIMARY KEY (position)
 PRIMARY KEY (id)
);
-- CREATE TABLE top_albums ( changed to roles
CREATE TABLE roles (
--   position INT NOT NULL,
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(10,4),
  department_id INT NOT NULL,
--   artist VARCHAR(100) NULL,
--   album VARCHAR(100) NULL,
--   year INT NULL,
--   raw_total DECIMAL(10,4) NULL,
--   raw_usa DECIMAL(10,4) NULL,
--   raw_uk DECIMAL(10,4) NULL,
--   raw_eur DECIMAL(10,4) NULL,
--   raw_row DECIMAL(10,4) NULL,
--   PRIMARY KEY (position)
  PRIMARY KEY (id)
);

CREATE TABLE employee (

    -- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. 
--   This field may be null if the employee has no manager
--   position INT NOT NULL,
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  department_id INT,
--   artist VARCHAR(100) NULL,
--   album VARCHAR(100) NULL,
--   year INT NULL,
--   raw_total DECIMAL(10,4) NULL,
--   raw_usa DECIMAL(10,4) NULL,
--   raw_uk DECIMAL(10,4) NULL,
--   raw_eur DECIMAL(10,4) NULL,
--   raw_row DECIMAL(10,4) NULL,
--   PRIMARY KEY (position)
  PRIMARY KEY (id)
);

SELECT * FROM department;
select * from roles;
select * from employees;