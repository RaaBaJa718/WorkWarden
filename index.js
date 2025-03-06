import inquirer from 'inquirer';
import { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartmentToDB, addRoleToDB, addEmployeeToDB, updateEmployeeRole as dbUpdateEmployeeRole, deleteDepartment, deleteRole } from './db/db.js'; // Ensure the file extension is included

// Main menu prompt
const mainMenu = async () => {
  let exit = false;
  while (!exit) {
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
          'Delete a department',
          'Delete a role',
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'View all departments':
        const departments = await viewAllDepartments();
        console.table(departments);
        break;
      case 'View all roles':
        const roles = await viewAllRoles();
        console.table(roles);
        break;
      case 'View all employees':
        const employees = await viewAllEmployees();
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
        console.log('Updating employee role...');
        await updateEmployeeRole();
        break;
      case 'Delete a department':
        await deleteDepartmentPrompt();
        break;
      case 'Delete a role':
        await deleteRolePrompt();
        break;
      case 'Exit':
        console.log('Goodbye!');
        exit = true;
        break;
    }
  }
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
  await addDepartmentToDB(name);
  console.log(`Added department: ${name}`);
};

// Add a role
const addRole = async () => {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role:'
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for the new role:',
      validate: (input) => {
        if (!input || isNaN(input)) {
          return 'Please enter a valid department ID (a number).';
        }
        return true;
      }
    }
  ]);
  await addRoleToDB(title, salary, parseInt(departmentId));
  console.log(`Added role: ${title}, Salary: ${salary}, Department ID: ${departmentId}`);
};

// Add an employee
const addEmployee = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the new employee:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the new employee:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for the new employee:'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the new employee (leave blank if none):'
    }
  ]);
  await addEmployeeToDB(firstName, lastName, roleId, managerId);
  console.log(`Added employee: ${firstName} ${lastName}, Role ID: ${roleId}, Manager ID: ${managerId}`);
};

// Update an employee role
const updateEmployeeRole = async () => {
  try {
    // Fetch the list of employees
    const employees = await viewAllEmployees();
    const employeeChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));

    // Prompt the user to select an employee
    const { employeeId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee whose role you want to update:',
        choices: employeeChoices
      }
    ]);

    // Fetch the list of roles
    const roles = await viewAllRoles();
    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));

    // Prompt the user to select a new role
    const { roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roleChoices
      }
    ]);

    // Update the employee's role in the database
    await dbUpdateEmployeeRole(employeeId, roleId);
    console.log('Employee role updated successfully.');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
};

// Delete a department
const deleteDepartmentPrompt = async () => {
  const departments = await viewAllDepartments();
  const departmentChoices = departments.map(department => ({
    name: department.name,
    value: department.id
  }));

  const { departmentId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department you want to delete:',
      choices: departmentChoices
    }
  ]);

  await deleteDepartment(departmentId);
  console.log('Department deleted successfully.');
};

// Delete a role
const deleteRolePrompt = async () => {
  const roles = await viewAllRoles();
  const roleChoices = roles.map(role => ({
    name: role.title,
    value: role.id
  }));

  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role you want to delete:',
      choices: roleChoices
    }
  ]);

  await deleteRole(roleId);
  console.log('Role deleted successfully.');
};

// Start the application
mainMenu();