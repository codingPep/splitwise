const db = require("../models/Database/db");

exports.fetch = async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  console.log("email------>", email);
  var query = await db.query(`SELECT * FROM users WHERE email='${email}'`);
  // console.log("---->", query.rows);
  if (query.rowCount == 0) {
    res.send("Please Register!!!");
  } else {
    if (query.rows[0].password == pass) {
      res.send(query.rows[0]);
    } else {
      res.send("Password Mismatch!");
    }
  }
};

exports.update = async (req, res, next) => {
  const amount = req.body.amount;
  const id = req.body.id;
  var query = await db.query(`SELECT * FROM users WHERE id='${id}'`);
  console.log("---->", query.rows[0].balance);
  const balance = query.rows[0].balance;
  const amt = balance - amount;
  var q = await db.query(`UPDATE users SET balance='${amt}' WHERE id='${id}'`);
  res.send("success");
};

exports.balance = async (req, res, next) => {
  const id = req.body.id;
  var query = await db.query(`SELECT balance FROM users WHERE id='${id}'`);

  res.send(query.rows[0]);
};

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;
  const image = "https://react.semantic-ui.com/images/avatar/small/jenny.jpg";
  // var Email = email.split("@");
  // var name = Email[0];
  var test = await db.query(`SELECT email from users WHERE email='${email}'`);
  if (test.rowCount != 0) {
    res.send("Already Registered...Please sign in");
  }
  var query = await db.query(
    `INSERT INTO users (name,email,password,balance,image) VALUES ('${name}','${email}','${pass}','${10000}','${image}')`
  );
  // console.log("SIGNUP---->", query.rowCount);
  if (query.rowCount == 1) {
    res.send("success");
  } else res.send("Failed!!!");
};

exports.google = async (req, res, next) => {
  const email = req.body.email;
  var Email = email.split("@");
  var name = Email[0];
  // var domain=sEmails[1];
  // console.log("=======>", email);
  var test = await db.query(`SELECT email from users WHERE email='${email}'`);
  if (test.rowCount != 0) {
    res.send("Already Registered...Please sign in");
  } else {
    var query = await db.query(
      `INSERT INTO users (name,email,isadmin) VALUES ('${name}','${email}','${0}')`
    );
    // console.log("SIGNUP---->", query);
    if (query.rowCount == 1) {
      res.send("success");
    } else res.send("Failed!!!");
  }
};
