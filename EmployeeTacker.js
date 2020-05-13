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
        for(let i = 0; i < results.length; i++) {
            departments.push(results[i]["department_name"]);
        }
        inquirer .prompt([{message: "Which Department would you like to look at?", name:"Department", type:"list",
            choices: departments
        }]).then(department => {
            con.query("SELECT first_name, second_name, manager, title, salary, department_name FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id WHERE department_name = '" + department.Department + "'", function(err, results) {
                let employees = results;
                if (employees.length === 0) {
                    console.log("")
                    console.log("There are no employees in that department.")
                    console.log("")
                } else {
                    console.log("")
                    console.table(employees);
                }
                loop()
                return;
            })
                
            }
        )})
};
// ========================================


// View all employees method.
// ========================================
const ViewEmployees = () => {
    con.query("SELECT first_name, second_name, manager, title, salary, department_name FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id", function (err, results){
        if (err) throw(err);
        let employees = results;
        console.log("")
        console.table(employees);
        loop();
        return;
    })
};
// ========================================

// Adds an Employee
// ========================================
const AddEmployee = () => {
    con.query("SELECT id, title FROM roles", function(err, results){
        let roles = [];
        for (let i = 0; i < results.length; i++) {
            roles.push(results[i]["title"])
        }
        inquirer .prompt([
            {message: "What is the first name of your Employee?", type: "input", name: "first_name"},
            {message: "What is the second name of your Employee?", type: "input", name: "second_name"},
            {message: "What is the Employees' role?", type:"list", choices: roles, name: "role"},
            {message: "Who is the Employees' Manager?", type: "input", name: "manager"}
        ]).then(e => {
            for(let i = 0; i < results.length; i++) {
                if (results[i]["title"] === e.role) {
                    let role_id = results[i]["id"];
                    con.query("INSERT INTO employees VALUES (id, '" + e.first_name + "', '" + e.second_name + "', " + role_id + ", '" + e.manager + "')")
                    console.log("Successfully Added Employee - " + e.first_name + " " + e.second_name + ".")
                    loop();
                    return;
                }
            }
        })

})};
// ========================================

// Removes an Employee
// ========================================
const RemoveEmployee = () => {
    con.query("SELECT * FROM employees", function(err, results){
        let employees = []
        for (let i = 0; i < results.length; i++) {
            let name = "(" + i + ")" + " " + results[i]["first_name"] + " " + results[i]["second_name"];
            employees.push(name)
        }

        inquirer .prompt({
            message: "Which Employee do you want to remove?", type: "list", choices: employees, name: "name"
        }).then(choice => {
            // this is the BEST way to do this and no one can convince me otherwise :)
            let employee = choice.name;
            employee = employee.slice(1, 2);
            parseInt(employee);
            let ID = results[employee]["id"];
            con.query("DELETE FROM employees WHERE id = " + ID)
            console.log("")
            console.log("Successfully Deleted.")
            console.log("")
            loop();
            return;
        })
})};
// ========================================

// Update an Employee
// ========================================
const UpdateEmployee = () => {
    con.query("SELECT * FROM employees", function(err, results){
        let employees = [];
        for (let i = 0; i < results.length; i++) {
            let name = "(" + i + ")" + " " + results[i]["first_name"] + " " + results[i]["second_name"];
            employees.push(name);
        }

        inquirer .prompt([
            {message: "Which Employee do you want to update?", type: "list", choices: employees, name: "name"},
            {message: "What would you like to change?", type: "list", name: "updateChoice",
            choices: [
                "first_name",
                "second_name",
                "Role",
                "Manager"]}
        ]).then(choice => {
            let employee = choice.name;
            employee = employee.slice(1, 2);
            parseInt(employee);
            let ID = results[employee]["id"];
            if (choice.updateChoice === "Role") {
                con.query("SELECT id, title FROM roles", function(err, results){
                    let roles = [];
                    for (let i = 0; i < results.length; i++) {
                        roles.push(results[i]["title"])
                    }
                inquirer .prompt ([{
                    message: "what role would you like to change them to?", type: "list", choices: roles, name: "newRole"
                }]).then(newRole => {
                    con.query("UPDATE employees SET role_id = (SELECT id from roles WHERE title = '" + newRole.newRole + "') WHERE id = " + ID)
                    loop();
                    return;
                });
        })} else if (choice.updateChoice === "Manager") {
            inquirer .prompt([{message: "Who is the new manager?", type:"input", name: "newManager"}]).then(manager => {
                con.query("UPDATE employees SET manager = '" + manager.newManager + "' WHERE id = " + ID)   
                loop();
                return;
            })
        } else {
            inquirer .prompt([{message: "What would you like to change that name to?", type: "input", name: "name"}]).then(name => {
                con.query("UPDATE employees SET " + choice.updateChoice + " = '" + name.name + "' WHERE id = " + ID)
                loop();
                return;
            })
        }
        
    })})};

// ========================================

// View Departments
// ========================================
const ViewDepartments = () => {
    con.query("SELECT department_name FROM departments", function (err, results){
        if (err) throw(err);
        let departments = results;
        console.log("")
        console.table(departments);
        loop();
        return;
    })
};
// ========================================

// Adds a department
// ========================================
const AddDepartment = () => {
        inquirer .prompt([
            {message: "What is the name of the department?", type: "input", name: "name"}
        ]).then(department => {
            con.query("INSERT INTO departments VALUES (id, '" + department.name + "')")
            console.log("Successfully Added Department - " + department.name + ".")
            loop();
            return;
        })

};
// ========================================


// View Roles
// ========================================
const ViewRoles = () => {
    con.query("SELECT title, salary, department_name from roles LEFT JOIN departments ON departments.id = roles.department_id", function (err, results){
        if (err) throw(err);
        let roles = results;
        console.log("")
        console.table(roles);
        loop();
        return;
    })
};
// ========================================


// Adds a Role
// ========================================
const AddRole = () => {
    con.query("SELECT id, department_name FROM departments", function(err, results){
        let departments = [];
        for (let i = 0; i < results.length; i++) {
            departments.push(results[i]["department_name"])
        }
        inquirer .prompt([
            {message: "What is the title of this role?", type: "input", name: "title"},
            {message: "What is the salary of this role?", type: "input", name: "salary"},
            {message: "What is the Role's department?", type:"list", choices: departments, name: "department"}
        ]).then(e => {
            if (isNaN(e.salary)) {
                console.log("");
                console.log("Please try again and enter a number for the salary.");
                console.log("");
                loop();
                return;
            }
            for(let i = 0; i < results.length; i++) {
                if (results[i]["department_name"] === e.department) {
                    let role_id = results[i]["id"];
                    con.query("INSERT INTO roles VALUES (id, '" + e.title + "', '" + e.salary.trim() + "', " + role_id + ")");
                    console.log("Successfully Added Role - " + e.title + ".");
                    loop();
                    return;
                }
            }
        })

})};
// ========================================




// Part of loop(), for the User to select which task to complete.
// ========================================
const questions = () => inquirer .prompt([
    {message: "What would you like to do?", name: "Task", type: "list", 
    choices: [
        "View all Employees", 
        "View Employees by department",
        "Add Employee", 
        "Remove Employee", 
        "Update Employee",
        "View Departments",
        "Add Departments",
        "View Roles",
        "Add Roles"
    ]}]).then(
    (Tasks) => {
    Task = Tasks.Task;
    return Task;
});
// ========================================


// The main loop, User selects which task to complete
// ========================================
const loop = () => {
    questions().then(Task => {
        if (Task === "View all Employees") {
            ViewEmployees("All");
        } else if (Task === "View Employees by department") {
            ByDepartment();
        } else if (Task === "Add Employee") {
            AddEmployee();
        } else if (Task === "Remove Employee") {
            RemoveEmployee();
        } else if (Task === "Update Employee") {
            UpdateEmployee();
        } else if (Task === "View Departments") {
            ViewDepartments();
        } else if (Task === "Add Departments") {
            AddDepartment();
        } else if (Task === "View Roles") {
            ViewRoles();
        } else if (Task === "Add Roles") {
            AddRole();
        } else {
            loop();
            return;
        }
})};
// ========================================


// initialises the methods.
loop();