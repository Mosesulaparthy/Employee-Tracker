const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
require('console.table')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Benzidog1!@',
        database: 'office_db'
    },
    console.log(`Connected to the office_db database.`)
);

function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        startApp();
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM role', (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        startApp();
    })
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        startApp();
    })
}

function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the department id of the role?'
        }
    ]).then((answers) => {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)'
        db.query(query, [answers.title, answers.salary, answers.department], (err, rows) => {
            if (err) {
                console.log(err);
            }
            console.log(`Added ${answers.title} as a role with a salary of ${answers.salary} to ${answers.department_id}`);
            startApp();
        });
    });
}
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then((answers) => {
        const query = 'INSERT INTO department (name) VALUES (?)'
        db.query(query, [answers.name], (err, rows) => {
            if (err) {
                console.log(err);
            }
            console.log(`Added ${answers.name} as a department`);
            startApp();
        });
    });
}

function addAnEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the role id of the employee?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'What is the manager id of the employee?'
        },
    ]).then((answers) => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'
        db.query(query, [answers.first_name, answers.last_name, answers.role, answers.manager], (err, rows) => {
            if (err) {
                console.log(err);
            }
            console.log(`Added ${answers.first_name} ${answers.last_name} as an employee with the role id of ${answers.role} under the manager ${answers.manager}`);
            startApp();
        });
    });
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the id of the employee?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the new role ID for the employee that is chosen?'
        }
    ]).then((answers) => {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?'
        db.query(query, [answers.roleId, answers.employeeId], (err, rows) => {
            if (err) {
                console.log(err);
            }
            console.log(`Employee with the id ${answers.employeeId} has changed roles to roleID:${answers.roleId}`);
            startApp();
        });
    });
}



function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "What would you like to do",
            choices: [
                'ALL_DEPARTMENTS',
                'ALL_ROLES',
                'ALL_EMPLOYEES',
                'ADD_DEPARTMENT',
                'ADD_ROLE',
                'ADD_EMPLOYEE',
                'UPDATE_EMPLOYEE'

            ]
        }
    ])
        .then((answer) => {
            switch (answer.option) {
                case 'ALL_DEPARTMENTS':
                    viewAllDepartments();
                    break;
                case 'ALL_ROLES':
                    viewAllRoles();
                    break;
                case 'ALL_EMPLOYEES':
                    viewAllEmployees();
                    break;
                case 'ADD_DEPARTMENT':
                    addDepartment();
                    break;
                case 'ADD_ROLE':
                    addARole();
                    break;
                case 'ADD_EMPLOYEE':
                    addAnEmployee();
                    break;
                case 'UPDATE_EMPLOYEE':
                    updateEmployee();
                    break;

            }
        })
}

startApp();