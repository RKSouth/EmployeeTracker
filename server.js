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
//Beginning function- prompt
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

//main view function
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
    var query = "SELECT roles.id , roles.title , roles.salary AS salary, department.deptname AS department FROM roles";
    query += " LEFT JOIN department ON (roles.department_id = department.id)";
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
//main add function
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
                addD(answer.add);
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

function addD(){
  inquirer
  .prompt([
    {
    name: "id",
    type: "input",
    message: "Please input department id"
  },
  {
    name: "deptname",
    type: "input",
    message: "Please input department name"
  }]

    ).then(function(answer) {
      // var values = [id, deptname];
      // var query = "INSERT INTO department (id, deptname) VALUE  = ? ?";
      connection.query("INSERT INTO department (id, deptname) VALUES (?,?)", [answer.id, answer.deptname]);
      console.log("\x1b[32m", `${answer.deptname} was added to departments.`);
      runSearch();
    
});
// viewD();

    // })


}
function addR() {
  inquirer
  .prompt([
    {
    name: "id",
    type: "input",
    message: "Please input a new role id"
  },
  {
    name: "title",
    type: "input",
    message: "Please input role title"
  },
  {
    name: "salary",
    type: "input",
    message: "Please input role salary"
  },
  {
    name: "department_id",
    type: "input",
    message: "Please input a department id"
  }]

    ).then(function(answer) {
      // var values = [id, deptname];
      // var query = "INSERT INTO department (id, deptname) VALUE  = ? ?";
      connection.query("INSERT INTO roles (id, title, salary, department_id) VALUES (?,?,?,?)", [answer.id, answer.title, answer.salary, answer.department_id]);
      console.log("\x1b[32m", `${answer.title} was added to roles.`);
      runSearch();
    
});

}
function addE() {
  inquirer
  .prompt([
    {
    name: "id",
    type: "input",
    message: "Please input a new employee id"
  },
  {
    name: "first_name",
    type: "input",
    message: "Please input employees first name"
  },
  {
    name: "last_name",
    type: "input",
    message: "Please input employees last name"
  },
  {
    name: "role_id",
    type: "input",
    message: "Please input a role id"
  },
  {
    name: "manager_id",
    type: "input",
    message: "Please input a manager id"
  }]

    ).then(function(answer) {
      // var values = [id, deptname];
      // var query = "INSERT INTO department (id, deptname) VALUE  = ? ?";
      connection.query("INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)", [answer.id, answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
      console.log("\x1b[32m", `${answer.first_name} ${answer.last_name} was added to employees.`);
      runSearch();
    
});

}

function updateER() {
let eArray = [];
let rArray = [];
viewR();
for (i=0; i < roles.length; i++){
  rArray.push(roles[i].title);
};
for (i=0; i < employees.length; i++){
  eArray.push(employees[i].Employee);
  //console.log(value[i].name);
}
}

function updateEMS() {

}

function viewEByM() {

}

function forgetDRE() {

}

function forgetD() {

}

function forgetR() {

}

function forgetE() {

}