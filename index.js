const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "media_app",
  password: "Altaf2024",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
// show total count
app.get("/", (req, res) => {
  let q = "select count(*) from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
  }
  //   connection.end();
});

// show route
app.get("/user", (req, res) => {
  let q = "select * from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result;
      res.render("user.ejs", { users });
    });
  } catch (err) {
    console.log(err);
  }
});

// edit route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user where id = '${id}'`;
  connection.query(q, (err, result) => {
    try {
      if (err) throw err;
      let user = result[0];
      console.log(result[0]);
      res.render("edit.ejs", { user });
    } catch (err) {
      console.log(err);
      res.send("Error with database!");
    }
  });
});
// patch route or update
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;

  let q = `select * from user where id = '${id}'`;

  connection.query(q, (err, result) => {
    try {
      if (err) throw err;
      let user = result[0];
      if (formPass !== user.password) {
        res.send("Wrong Password!");
      } else {
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    } catch (err) {
      console.log(err);
      res.send("error with db");
    }
  });
});

// delete user
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  res.render("delete.ejs", { id });
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { email: formEmail, password: formPass } = req.body;

  let q = `select * from user where id = '${id}'`;

  connection.query(q, (err, result) => {
    if (err) throw err;
    let user = result[0];
    try {
      if (formEmail == user.email && formPass == user.password) {
        let q2 = `DELETE FROM user WHERE  email = '${user.email}' and password = '${user.password}'`;
        connection.query(q2, (err, result2) => {
          if (err) throw err;
          res.redirect("/user");
          console.log(result2);
        });
      } else {
        res.send("Wrong email or password");
      }
    } catch (err) {
      console.log(err);
      res.send("error with db");
    }
  });
});
// add new user
app.get("/user/new", (req, res) => {
  let id = uuidv4();
  let { username, email, password } = req.query;

  let newUser = {
    username,
    email,
    password,
  };
  console.log(newUser);
  res.render("new.ejs");
});
app.post("/user", (req, res) => {
  let id = uuidv4();
  let { username, email, password } = req.body;
  console.log(id, username, email, password);

  let q = `insert into user values ('${id}','${username}','${email}','${password}')`;
  connection.query(q, (err, result) => {
    try {
      if (err) throw err;
      console.log(result);
      res.redirect("/user");
    } catch (err) {
      console.log(err);
      res.send("Error inserting the data");
    }
  });
});

app.listen("8080", (req, res) => {
  console.log("server listning on the port 8080");
});

// let user = ["001", "Altaf Khan", "altaf@gmail.com", "openPass"];
// let q = "insert into user(id,username,email,password) VALUES (?,?,?,?)";

// let users = [
//   ["002", "Arif Khan", "arif@gmail.com", "arif@123"],
//   ["003", "Yousuf Ahmad", "yousuf@gmail.com", "yousuf@123"],
// ];

// let data = [];
// for (let i = 1; i <= 100; i++) {
//   data.push(getRandomUser());
// }

// let q = "insert into user(id,username,email,password) VALUES ?";
