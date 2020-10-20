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

connection.connect(function (err) {
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
    .then(function (answer) {
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
        case "Update employee managers":
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
    .then(function (answer) {
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

      }
    });
}

function viewD() {
  //add manager id and have it be the same as department id- because
  var query = "SELECT deptid, deptname, manager FROM department";
  console.log("You have chosen to view the departments");
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log("id: " + res[i].deptid + " || Name: " + res[i].deptname);
    // } if (err) throw err;
  });
  runSearch();
}

function viewR() {
  var query = "SELECT roles.addid , roles.title , roles.salary AS salary, department.deptname AS department FROM roles";
  query += " LEFT JOIN department ON (roles.department_id = department.deptid)";
  connection.query(query, function (err, res) {
    console.table(res);
  });
  runSearch();
}

function viewE() {
  var query = "SELECT employee.empid, employee.first_name, employee.last_name, roles.title, department.deptname AS department, roles.salary FROM employee LEFT JOIN roles on employee.role_id = roles.addid LEFT JOIN department on roles.department_id = department.deptid;";
  connection.query(query, function (err, res) {
    console.table(res);
  });
  runSearch();
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
    .then(function (answer) {
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

      }
    });
}

function addD() {
  inquirer
    .prompt([
     
      {
        name: "deptname",
        type: "input",
        message: "Please input department name"
      },  {
        name: "manager",
        type: "input",
        message: "Please input department manager"
      }]

    ).then(function (answer) {
      // var values = [id, deptname];
      // var query = "INSERT INTO department (id, deptname) VALUE  = ? ?";
      connection.query("INSERT INTO department (manager, deptname) VALUES (?,?)", [answer.manager, answer.deptname]);
      console.log("\x1b[32m", `${answer.deptname} was added to departments.`);
      runSearch();

    });
  // viewD();

  // })


}
function addR() {
//  let dArray= [];
//  let dArrayID= [];
//   var query = "SELECT department.deptid, department.deptname FROM department;";
//   connection.query(query, function (err, res) {
//     if (err) throw err;
   
//     for (var i = 0; i < res.length; i++) {
//       dArray.push(res[i].deptid);
//       console.log(dArray);
//       console.log("         ")
//     }});
   
  inquirer
    .prompt([
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
        message: "Please choose which department this role is for(choose a number)"
      }]

    ).then(function (answer) {
      // connection.query(`Update employee SET role_id = (select roleid from roles where title = ?) WHERE first_name = ?`, [answer.roles, answer.employees]);
      connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [answer.title, answer.salary, answer.department_id]);
      console.log("\x1b[32m", `${answer.title} is now a role in the ${answer.department_id} department.`);
      runSearch();

    });

}
function addE() {
  inquirer
    .prompt([
    
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

    ).then(function (answer) {
      // var values = [id, deptname];
      // var query = "INSERT INTO department (id, deptname) VALUE  = ? ?";
      connection.query("INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
      console.log("\x1b[32m", `${answer.first_name} ${answer.last_name} was added to employees.`);
      runSearch();

    });

}

function updateER() {
  let eArray = [];
  let eArrayID = [];
  let rArray = [];

  connection.query("SELECT title FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      rArray.push(res[i].title);
    }

  });

  var query = "SELECT employee.empid, employee.first_name FROM employee;";
  connection.query(query, function (err, res) {
    if (err) throw err;
   
    for (var i = 0; i < res.length; i++) {
      eArray.push(res[i].first_name);
      eArrayID.push(res[i]);
 
    }
    inquirer
      .prompt([{
        name: "employees",
        type: "list",
        message: "Who's role would you like to change?",
        choices: eArray
      }, {
        name: "roles",
        type: "list",
        message: "What is their new role",
        choices: rArray
      }]).then(function (answer) {

//look up role id number so we can attach it to employee table
//look up employee id and change the employee
        connection.query(`Update employee SET role_id = (select addid from roles where title = ?) WHERE first_name = ?`, [answer.roles, answer.employees]);
        console.log("\x1b[32m", `${answer.employees}'s role was updated to ${answer.roles}.`);
        runSearch();



      });


  });
};

  function updateEMS() {
    //update employee by managers change roles to managers
    let eArray = [];
   
    let mArray = [];


  let rArray = [];

  connection.query("SELECT manager_id FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      rArray.push(res[i].manager_id);
    }

  });


    connection.query("SELECT manager, deptid FROM department", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        mArray.push(res[i]);
        console.table(mArray);
      }
  
    });
  
    var query = "SELECT employee.empid, employee.first_name FROM employee;";
    connection.query(query, function (err, res) {
      if (err) throw err;
     
      for (var i = 0; i < res.length; i++) {
        eArray.push(res[i].first_name);
        eArrayID.push(res[i]);
   
      }
      inquirer
        .prompt([{
          name: "employees",
          type: "list",
          message: "Who's manager would you like to change?",
          choices: eArray
        }, {
          name: "managers",
          type: "list",
          message: "Who is there new manager?",
          choices: mArray
        }]).then(function (answer) {
  
  //look up role id number so we can attach it to employee table
  //look up employee id and change the employee
          connection.query(`Update employee SET role_id = (select roleid from roles where title = ?) WHERE first_name = ?`, [answer.roles, answer.employees]);
          console.log("\x1b[32m", `${answer.employees}'s role was updated to ${answer.roles}.`);
          runSearch();
  
  
  
        });
  
  
    });

  }

  // function viewEByM() {

  // }

  function forgetDRE() {inquirer
    .prompt({
      name: "view",
      type: "rawlist",
      message: "What would you like to delete?",
      choices: ["departments", "roles", "employees", "go back"]
    })
    .then(function (answer) {
      switch (answer.view) {
        case "departments":
          forgetD(answer.view);
          break;
        case "roles":
          forgetR();
          break;
        case "employees":
          forgetE();
          break;
        case "go back":
          console.log("You have chosen to go back to the first question");
          runSearch();
          break;

      }
    });

  }

  function forgetD() {

  }

  function forgetR() {

  }

  function forgetE() {

  }