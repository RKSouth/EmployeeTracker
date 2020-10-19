var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeetracker_db",
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments, roles or employees",
        "View departments, roles or employees",
        "Update employee roles",
        "Update employee mangers",
        "View employees by manager",
        "Delete departments, roles, or employees"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add departments, roles or employees":
            addDRE();
            break;
        case "View departments, roles or employees":
            viewDRE();
            break;
        case "Update employee roles":
            updateER();
            break;
        case "Update employee mangers":
            updateEMS();
            break;
        case "View employees by manager":
            viewEByM();
            break;
        case "Delete departments, roles, or employees":
            forgetDRE();

      }
    });
}
//NEED DEPARTMENT, ROLE, EMPLOYEE CLASSES TO THEN CALL 


function viewDRE() {
    // FIRST ASK DEPARTMENT ROLE EMPLOYEE OR GO BACK 
    inquirer
      .prompt({
        name: "view",
        type: "rawlist",
        message: "What would you like to view?",
        choices: ["departments", "roles", "employees", "go back"]
      })
      .then(function(answer) {
        switch (answer.view) {
            case "departments":
                viewD(answer.view);
            break;
            case "roles":
                viewR();
                break;
            case "employees":
                viewE();
                break;
            case "go back":
                console.log("You have chosen to go back to the first question");
                runSearch();
                break;

        } }); }

function viewD(){
var query = "SELECT id, deptname FROM department";
console.log("You have chosen to view the departments");
connection.query(query, function(err, res) {
    console.log(res);
for (var i = 0; i < res.length; i++) {
console.log("id: " + res[i].id + " || Name: " + res[i].deptname);
}  if (err) throw err;
}); 
runSearch();
}     
          
function viewR() {
    var query = "SELECT * FROM roles";
    connection.query(query, function(err, res) {
        console.table(res);
    })
}

function  viewE() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.deptname AS department, roles.salary FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id;";
    connection.query(query, function(err, res) {
        console.table(res);
    })
}        

function addDRE() {
  inquirer
      .prompt({
        name: "add",
        type: "rawlist",
        message: "What would you like to add?",
        choices: ["departments", "roles", "employees", "go back"]
      })
      .then(function(answer) {
        switch (answer.add) {
            case "departments":
                addD(answer.view);
            break;
            case "roles":
                addR();
                break;
            case "employees":
                addE();
                break;
            case "go back":
                console.log("You have chosen to go back to the first question");
                runSearch();
                break;

        } });
}
