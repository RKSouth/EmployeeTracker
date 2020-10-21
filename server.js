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
        "Update an employees manager",
        // "View employees by manager",
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
        case "Update an employees manager":
          updateEMS();
          break;
        // case "View employees by manager":
        //   viewEByM();
        //   break;
        case "Delete departments, roles, or employees":
          forgetDRE();

      }
    });
}

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
          viewD();
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
  var query = "SELECT deptid, deptname FROM department";
  console.log("You have chosen to view the departments");
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
 
}

function viewR() {
  var query = "SELECT roles.addid , roles.title , roles.salary AS salary, department.deptname AS department FROM roles";
  query += " LEFT JOIN department ON (roles.department_id = department.deptid)";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
  
}

function viewE() {
  var query = "SELECT employee.empid, employee.first_name, employee.last_name, roles.title, department.deptname AS department,roles.salary, mgr.manager, manager_id FROM employee LEFT JOIN roles on employee.role_id = roles.addid LEFT JOIN department on roles.department_id = department.deptid LEFT JOIN (select concat(first_name,' ',last_name) as manager, empid from employee) as mgr on mgr.empid = employee.manager_id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
 
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
      }]

    ).then(function (answer) {
      // var values = [id, deptname];
      // var query = "INSERT INTO department (id, deptname) VALUE  = ? ?";
      connection.query("INSERT INTO department  (deptname) VALUES (?)", 
      [answer.deptname], function (err) {
        if (err) throw err;
      });
      console.log("\x1b[32m", `${answer.deptname} was added to the list of departments.`);
      runSearch();

    });
}

function addR() {
  let deptNameArray = [];
  let deptIdArray = [];
  let outputDeptID;
  //getting department list
    connection.query("SELECT deptname, deptid FROM department", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        deptNameArray.push(res[i].deptname);
        deptIdArray.push(res[i].deptid);
      }
    });
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
        name: "department_name",
        type: "list",
        message: "Please choose which department this role is for",
        choices: deptNameArray
        //NEEDS A VALIDATE
      }]

    ).then(function (answer) {
      for (let i = 0; i < deptNameArray.length; i++) {
        if (answer.department_name == deptNameArray[i]) {
        outputDeptID = parseInt(deptIdArray[i]);       
        }  
      };
      connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [answer.title, answer.salary, outputDeptID]);
      console.log("\x1b[32m", `${answer.title} is now a role in the ${answer.department_name} department (${outputDeptID}).`);
      runSearch();

    });

}
function addE() {
  //employee Role arrays
  let empTitleArray = [];
  let empIdArray = [];
  let outputRoleID;

  let mngIdArray = [];
  let mngArray = [];
  let output;

  //getting roles for employee array
    connection.query("SELECT title, addid FROM roles", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        empTitleArray.push(res[i].title);
        empIdArray.push(res[i].addid);
      }
    });
    //manager id list
    // LEFT JOIN (select concat(first_name,' ',last_name) as manager, empid from employee) as mgr on mgr.empid = employee.manager_id;
    connection.query("SELECT mgr.manager, manager_id FROM employee LEFT JOIN (select concat(first_name,' ',last_name) as manager, empid from employee) as mgr on mgr.empid = employee.manager_id", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        mngArray.push(res[i].manager);
        mngIdArray.push(res[i].manager_id);
      }
    
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
        name: "role_name",
        type: "list",
        message: "Please select a role",
        choices: empTitleArray
      },
      {
        name: "manager_id",
        type: "list",
        message: "Please select a manager",
        choices: mngArray
      }]

    ).then(function (answer) {
      for (let i = 0; i < empTitleArray.length; i++) {
        if (answer.role_name == empTitleArray[i]) {
        outputRoleID = parseInt(empIdArray[i]);       
        }  
      };
      for (let i = 0; i < mngArray.length; i++) {
        if (answer.manager_id == mngArray[i]) {
        output = parseInt(mngIdArray[i]);       
        }  
      };
      console.log(output);
      console.log(outputRoleID);
      connection.query("INSERT INTO employee (first_name, last_name, role_name, manager_id) VALUES (?,?,?,?)", 
      [answer.first_name, answer.last_name, outputRoleID, output],
       function (err) {
        if (err) throw err;
      });
      console.log("\x1b[32m", `${answer.first_name} ${answer.last_name} was added to employees and now works for ${answer.manager_id}.`);
      runSearch();

    });
  });

}

function updateER() {
  //for the group that you are in
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

    //update employee managers change roles to managers
    let eArray = [];
    let mArray = [];
//getting managers id
  connection.query("SELECT empid FROM employee", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      mArray.push(res[i].empid);
    }
  });

  //getting employee to update
  var query =  "SELECT employee.first_name FROM employee;";
    connection.query(query, function (err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        eArray.push(res[i].first_name);
      };
      inquirer
        .prompt([{
          name: "employeeToUpdate",
          type: "list",
          message: "Who's manager would you like to change?",
          choices: eArray
        }, {
          name: "managers",
          type: "list",
          message: "Who is there new manager?",
          choices: mArray
        }])
        .then(function (answer) {
          connection.query(`Update employee SET manager_id =(select deptid  FROM department WHERE deptid = ?) WHERE first_name = ?;`, 
          [answer.managers, answer.employeeToUpdate],  function (err) {
            if (err) throw err;});
          console.log("\x1b[32m", `${answer.employeeToUpdate}'s manager was updated to ${answer.managers}.`);
          runSearch();
        });
  
  
    });

  }

  // function viewEByM() {

  // }

  function forgetDRE() {
    inquirer
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
   let ddArray= [];
    connection.query("SELECT deptname FROM department", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        ddArray.push(res[i].deptname);
        // console.table(ddArray);
      }
      console.log(ddArray);
      inquirer.
      prompt([
        {name: "selectDepartment",
        type: "list",
        message: "What department would you like to delete?",
        choices: ddArray
      }
    ]).then ( function(answer) {
    connection.query('DELETE department FROM department WHERE deptname = ?', [answer.selectDepartment], function (err, answer) {
    if (err) throw error;
    console.log('deleted the ' + answer.selectDepartment + ' ');
    runSearch();
  })
  });

  });

  }

  function forgetR() {
    let drArray= [];
    connection.query("SELECT title FROM roles", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        drArray.push(res[i].title);
    
      }
     

      inquirer.
      prompt([
        {name: "selectRole",
        type: "list",
        message: "What role would you like to delete?",
        choices: drArray
      }
    ]).then ( function(answer) {

    connection.query('DELETE roles FROM roles WHERE roles = ?', 
    [answer.selectRole], function (err, results) {
    if (err) throw error;
    console.log('deleted the ' + results.selectRole + ' role ');
  });
  runSearch();
      });
  });

  }

  function forgetE() {
    let deArray= [];
    connection.query("SELECT first_name FROM employee", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        deArray.push(res[i].first_name);
  
      }
      // console.log(ddArray);
   
  
      inquirer.
      prompt([
        {name: "selectEmployee",
        type: "list",
        message: "What Employee would you like to delete?",
        choices: deArray
      }
    ]).then ( function(answer) {

    connection.query('DELETE employee FROM employee WHERE first_name = ?', 
    [answer.selectEmployee], 
    function (err, results) {
    if (err) throw error;
    console.log('deleted the ' + results.selectEmployee + ' ');
  })
  runSearch();
      });

  });
  }