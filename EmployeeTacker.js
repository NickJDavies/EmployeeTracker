// Dependencies
// ========================================
const inquirer = require("inquirer");
const MySQL = require("mysql");
const consoleTable = require("console.table");
// ========================================


// setting up the mysql connection
// ========================================
const con = MySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "business_db"
});
// ========================================


// View Employees By Department
// ========================================
const ByDepartment = () => {
    con.query("SELECT * FROM departments", function (err, results){
        if (err) throw(err);
        let departments = [];
        for(i = 0; i < results.length; i++) {
            departments.push(results[i]["department_name"]);
        }
        inquirer .prompt([{message: "Which Department would you like to look at?", name:"Department", type:"list",
            choices: departments
        }]).then(department => {
            con.query("SELECT * FROM ", function (err, results){

            }
        })
    })
    
};
// ========================================


// View all employees method.
// ========================================
const ViewEmployees = () => {
    con.query("SELECT * FROM employees", function (err, results){
        if (err) throw(err);
        let employees = results;
        console.table(employees);
        loop();
        return;
    })
};
// ========================================


// Part of loop(), for the User to select which task to complete.
// ========================================
const questions = () => inquirer .prompt([
    {message: "What would you like to do?", name: "Task", type: "list", 
    choices: [
        "View all Employees", 
        "View Employees by department", 
        "View Employees by manager", 
        "Add Employee", 
        "Remove Employee", 
        "Update Employee role", 
        "Update Employee Manager"
    ]
}
]).then(
    (Tasks) => {
    Task = Tasks.Task;
    return Task;
});
// ========================================


// The main loop, User selects which task to complete
// ========================================
const loop = () => {
    questions().then(Task => {
        if(Task === "View all Employees") {
            ViewEmployees("All");
        } else if (Task === "View Employees by department") {
            ByDepartment();
        } else if (Task === "View Employees by manager") {

        } else if(Task === "Add Employee") {

        } else if(Task === "Remove Employee") {

        } else if(Task === "Update Employee role") {

        } else if (Task === "Update Employee Manager") {

        } else {
            console.log("Yet to be implemented")
            loop();
            return;
        }
})};
// ========================================


// initialises the methods.
loop();