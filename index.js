const mysql = require("mysql");
const inquirer = require("inquirer");
 //const conTable= require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Shantai@7070",
    database: "employeeDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
    //connection.end();
    userPrompt();
  });

  function userPrompt() {
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View department, roles or employees",
                "Add department, roles or employees",
                "Update employee role",
                "Delete departments, roles or employees",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.task) {
                case "View department, roles or employees":
                    viewAny();
                    break;

                case "Add department, roles or employees":
                    addAny();
                    break;

                case "Update employee role":
                    updateEmployeeRole();
                    break;

                //case "Update employee manager":
                    //updateEmployeeManager();
                    //break;

                case "Delete departments, roles or employees":
                    deleteAny();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

//function for view any departmet, employee or role....
function viewAny() {
    inquirer.prompt({
        name: "view_any",
        type: "list",
        message: "Which table would you like to view?",
        choices: ["Departments", "Roles", "Employees"]
    }).then(data => {
        if (data.view_any === "Departments") {
            connection.query("SELECT * FROM Departments", function (err, res) {
                if (err) throw err;
                console.table(res)
                userPrompt();
            });
        } else if (data.view_any === "Roles") {
            connection.query("SELECT * FROM Roles", function (err, res) {
                if (err) throw err;
                console.table(res)
                userPrompt();
            });
        } else if (data.view_any === "Employees") {
            connection.query("SELECT * FROM Employees", function (err, res) {
                if (err) throw err;
                console.table(res)
                userPrompt();
            });
        }
    })
}

//fuction for add Department or Role or employee....
function addAny() {
    inquirer.prompt({
        name: "add_any",
        type: "list",
        message: "Which would you like to add?",
        choices: ["Department", "Role", "Employee"]
    }).then(data => {
        if (data.add_any === "Department") {
            inquirer.prompt({
                type: "input",
                name: "add_dept",
                message: "What department you would like to add?"
            }).then(function (answer) {
                console.log(`You have added a ${answer.add_dept} department.`);
                connection.query("INSERT INTO Departments SET ?", {
                        name: answer.add_dept,
                    },
                    function (err, res) {
                        if (err) throw err;
                        userPrompt();
                    }
                )
            });
        } else if (data.add_any === "Role") {
            inquirer.prompt([{
                        type: "input",
                        name: "add_role",
                        message: "What is the name of the role you would like to add?"
                    },
                    {
                        type: "number",
                        name: "salary",
                        message: "What is the salary for the role you would like to add?"
                    },
                    {
                        type: "number",
                        name: "deptId",
                        message: "What is the department ID for the role you would like to add?"
                    }
                ])
                .then(function (answer) {
                    console.log(`You have added the role of ${answer.add_role}.`);
                    connection.query("INSERT INTO Roles SET ?", {
                            title: answer.add_role,
                            salary: answer.salary,
                            dept_id: answer.deptId
                        },
                        function (err, res) {
                            if (err) throw err;
                            userPrompt();
                        }
                    )
                });
        } else if (data.add_any === "Employee") {
            inquirer.prompt([{
                        type: "input",
                        name: "addLastName",
                        message: "What is the last name of the employee you would like to add?"
                    },
                    {
                        type: "input",
                        name: "addFirstName",
                        message: "What is the first name of the employee you would like to add?"
                    },
                    {
                        type: "number",
                        name: "addRoleId",
                        message: "What is the role ID of the employee you would like to add?"
                    },
                    {
                        type: "number",
                        name: "addManagerId",
                        message: "What is the manager ID of the employee you would like to add?"
                    }
                ])
                .then(function (answer) {
                    console.log(`You have added a employee named ${answer.addFirstName} ${answer.addLastName}.`);
                    connection.query("INSERT INTO Employees SET ?", {
                            last_name: answer.addLastName,
                            first_name: answer.addFirstName,
                            role_id: answer.addRoleId,
                            manager_id: answer.addManagerId
                        },
                        function (err, res) {
                            if (err) throw err;
                            userPrompt();
                        }
                    )
                });
        }
    })
}

//function for update employee role

function updateEmployeeRole() {
    inquirer
        .prompt([{
            name: "updateRole",
            type: "input",
            message: "What is the last name of the employee you would like to update?"
        }])
        .then(function (answer) {
            var query = "SELECT * FROM Employees WHERE ?";
            connection.query(query, {
                last_name: answer.updateRole
            }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.table(res);
                    inquirer.prompt({
                        name: "idConfirm",
                        type: "number",
                        message: "Please enter the employee's ID to confirm choice:",
                    }).then(function (answer) {
                        var query = "SELECT * FROM Employees WHERE ?";
                        connection.query(query, {
                            emp_id: answer.idConfirm
                        }, function (err, res) {
                            for (var i = 0; i < res.length; i++) {
                                console.log(answer.idConfirm);
                                let newRoleUpdate = answer.idConfirm;
                                inquirer.prompt({
                                        name: "updateRoleId",
                                        type: "number",
                                        message: "Please enter the new role ID for the employee:",
                                    })
                                    .then(function (answer) {
                                        var query = `UPDATE Employees SET ? WHERE emp_id = ${newRoleUpdate}`;
                                        connection.query(query, {
                                            role_id: answer.updateRoleId,
                                        }, function (err, res) {
                                            if (err) throw err;
                                            userPrompt();
                                        });
                                    });
                            }
                        })
                    })
                }
            })
        })
}

//function for update Employee manager

function deleteAny() {
  inquirer.prompt({
      name: "delete_any",
      type: "list",
      message: "Which would you like to delete?",
      choices: ["Department", "Role", "Employee"]
  }).then(data => {
      if (data.delete_any === "Department") {
          inquirer.prompt({
              type: "input",
              name: "delete_dept",
              message: "What department you would like to delete?"
          }).then(function (answer) {
              console.log(`You have deleted a ${answer.delete_dept} department.`);
              connection.query("DELETE FROM Departments SET ?", {
                      name: answer.delete_dept,
                  },
                  function (err, res) {
                      if (err) throw err;
                      userPrompt();
                  }
              )
          });
      } else if (data.delete_any === "Role") {
          inquirer.prompt([{
                      type: "input",
                      name: "delete_role",
                      message: "What is the name of the role you would like to delete?"
                  },
                  {
                      type: "number",
                      name: "salary",
                      message: "What is the salary for the role you would like to delete?"
                  },
                  {
                      type: "number",
                      name: "deptId",
                      message: "What is the department ID for the role you would like to delete?"
                  }
              ])
              .then(function (answer) {
                  console.log(`You have added the role of ${answer.delete_role}.`);
                  connection.query("DELETE FROM Roles SET ?", {
                          title: answer.delete_role,
                          salary: answer.salary,
                          dept_id: answer.deptId
                      },
                      function (err, res) {
                          if (err) throw err;
                          userPrompt();
                      }
                  )
              });
      } else if (data.delete_any === "Employee") {
          inquirer.prompt([{
                      type: "input",
                      name: "deleteLastName",
                      message: "What is the last name of the employee you would like to delete?"
                  },
                  {
                      type: "input",
                      name: "deleteFirstName",
                      message: "What is the first name of the employee you would like to delete?"
                  },
                  {
                      type: "number",
                      name: "deleteRoleId",
                      message: "What is the role ID of the employee you would like to delete?"
                  },
                  {
                      type: "number",
                      name: "deleteManagerId",
                      message: "What is the manager ID of the employee you would like to delete?"
                  }
              ])
              .then(function (answer) {
                  console.log(`You have deleted a employee named ${answer.deleteFirstName} ${answer.deleteLastName}.`);
                  connection.query("DELETE FROM Employees SET ?", {
                          last_name: answer.deleteLastName,
                          first_name: answer.deleteFirstName,
                          role_id: answer.deleteRoleId,
                          manager_id: answer.deleteManagerId
                      },
                      function (err, res) {
                          if (err) throw err;
                          userPrompt();
                      }
                  )
              });
      }
  })
}

  

  