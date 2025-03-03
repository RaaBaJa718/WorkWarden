-- seeds.sql

-- Insert departments
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources'),
('Sales');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Accountant', 60000, 2),
('HR Specialist', 50000, 3),
('Sales Manager', 70000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Smith', 1, NULL),
('Bob', 'Johnson', 2, 1),
('Charlie', 'Brown', 3, NULL),
('Dana', 'White', 4, 3);
