const inquirer = require("inquirer");
const mySQL = require("mysql");
const consoleTable = require("console.table");

let retry = false;

const questions = () => inquirer .prompt([
    {message: "What would you like to do?", name: "Task", type: "list", 
    choices: [
        "View all Employees", 
        "View Employees by department", 
        "View Employees by manager", 
        "Add Employee", 
        "Remove Employee", 
        "Update employee role", 
        "Update Employee Manager"
    ]
}
]).then(
    (Tasks) => {
    Task = Tasks.Task;
    return Task;
});


const loop = () => {
    questions().then(Task => {
        console.log(Task)
        loop();
        return;
})};

loop();