const db = require("../models/Database/db.js");

exports.fetch = async (req, res, next) => {
  const id = req.body.id;
  var query = await db.query(
    `SELECT users.id,name,image FROM friends join users on friends.friend=users.id and main='${id}'`
  );
  // console.log("---->", query.rows);
  if (query.rowCount == 0) {
    res.send("No products!!!");
  } else {
    res.send(query.rows);
  }
};

exports.option = async (req, res, next) => {
  const id = req.body.id;
  var query = await db.query(
    `SELECT * FROM users where id not in (SELECT friend from friends WHERE main='${id}') and users.id!='${id}'`
  );
  // console.log("---->", query.rows);
  if (query.rowCount == 0) {
    res.send("No friends!!!");
  } else {
    res.send(query.rows);
  }
};

exports.add = async (req, res, next) => {
  const main = req.body.main;
  const friend = req.body.friend;
  var query = await db.query(
    `INSERT INTO friends (main,friend) VALUES ('${main}','${friend}')`
  );
  // console.log("SIGNUP---->", query.rowCount);
  if (query.rowCount == 1) {
    res.send("success");
  } else res.send("Failed!!!");
};
