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