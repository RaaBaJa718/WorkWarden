import pkg from 'pg';
const { Pool } = pkg;

// Set up connection to the PostgreSQL database
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres', // Replace with your PostgreSQL username
  password: 'brycejayce', // Replace with your PostgreSQL password
  database: 'employee_tracker' // Replace with your database name
});

// Function to view all departments
export const viewAllDepartments = async () => {
  const query = 'SELECT * FROM department';
  const { rows } = await pool.query(query);
  return rows;
};

// Function to view all roles
export const viewAllRoles = async () => {
  const query = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Function to view all employees
export const viewAllEmployees = async () => {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Function to add a new department
export const addDepartmentToDB = async (name) => {
  const query = 'INSERT INTO department (name) VALUES ($1)';
  await pool.query(query, [name]);
};

// Function to add a new role
export const addRoleToDB = async (title, salary, departmentId) => {
  const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
  await pool.query(query, [title, salary, departmentId]);
};

// Function to add a new employee
export const addEmployeeToDB = async (firstName, lastName, roleId, managerId) => {
  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
  await pool.query(query, [firstName, lastName, roleId, managerId]);
};

// Function to update an employee's role
export const updateEmployeeRole = async (employeeId, roleId) => {
  const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
  await pool.query(query, [roleId, employeeId]);
};

// Function to delete a department
export const deleteDepartment = async (departmentId) => {
  const query = 'DELETE FROM department WHERE id = $1';
  await pool.query(query, [departmentId]);
};

// Function to delete a role
export const deleteRole = async (roleId) => {
  const query = 'DELETE FROM role WHERE id = $1';
  await pool.query(query, [roleId]);
};