USE employeeDB;

INSERT INTO Departments (name)
VALUES ("Finance"), ("Audit"), ("Marketing"), ("Production");

INSERT INTO Roles (title, salary, dept_id)
VALUES ("Accountant", 150000, 1),
("Clerk", 100000, 2),
("Salesman", 120000, 2),
("Analyst", 125000, 3),
("Manager", 250000, 4);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Meena", "Kay", 1, 3),
("Mike", "Chan", 2, 1),
("Jonah", "Rodre", 3, null),
("Kevin", "Ray", 4, 3),
("Vinay", "Patil", 5, null),
("Ramya", "Bhor", 2, null),
("Neha", "Jantre", 4, 7),
("Christian", "Roman", 1, 2);

