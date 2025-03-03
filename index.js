// index.js

const inquirer = require('inquirer');
const db = require('./db/db'); // Importing the SQL queries module

// Main menu prompt
const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View all departments':
      const departments = await db.viewAllDepartments();
      console.table(departments);
      break;
    case 'View all roles':
      const roles = await db.viewAllRoles();
      console.table(roles);
      break;
    case 'View all employees':
      const employees = await db.viewAllEmployees();
      console.table(employees);
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  // Return to main menu
  await mainMenu();
};

// Add a department
const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:'
    }
  ]);
  console.log(`Added department: ${name}`);
  // Add to database (implement function in db.js)
};

// Add a role
const addRole = async () => {
  console.log('Adding a role...');
  // Add to database (implement logic here)
};

// Add an employee
const addEmployee = async () => {
  console.log('Adding an employee...');
  // Add to database (implement logic here)
};

// Update an employee role
const updateEmployeeRole = async () => {
  console.log('Updating employee role...');
  // Update in database (implement logic here)
};

// Start the application
mainMenu();
