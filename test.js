import inquirer from 'inquirer';

async function testPrompt() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Option 1', 'Option 2', 'Option 3']
        }
    ]);
    console.log(`You chose: ${action}`);
}

testPrompt();