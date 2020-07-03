const db = require("../models/Database/db.js");

exports.fetch = async (req, res, next) => {
  const id = req.body.id;
  var query = await db.query(`SELECT * FROM products WHERE uid='${id}'`);
  // console.log("---->", query.rows);
  if (query.rowCount == 0) {
    res.send("No products!!!");
  } else {
    res.send(query.rows);
  }
};

exports.details = async (req, res, next) => {
  const id = req.body.id;
  var query = await db.query(`SELECT * FROM products WHERE id='${id}'`);
  // console.log("---->", query.rows);
  if (query.rowCount == 0) {
    res.send("No products!!!");
  } else {
    res.send(query.rows[0]);
  }
};

exports.share = async (req, res, next) => {
  const id = req.body.id;
  const mainid = req.body.mainid;
  var query = await db.query(
    `SELECT users.name,users.image FROM shares join users on users.id=shares.uid and shares.pid='${id}' UNION SELECT name,image from users WHERE id='${mainid}'`
  );
  // console.log("---->", query.rows);
  if (query.rowCount == 0) {
    res.send("No products!!!");
  } else {
    res.send(query.rows);
  }
};

exports.add = async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const owner = req.body.owner;
  const options = req.body.invities;
  // console.log("id------>", req.body);
  options.map((opt) => console.log(opt.id));
  var query = await db.query(
    `INSERT INTO products (name,price,uid) VALUES ('${name}','${price}','${owner}') RETURNING id`
  );
  const id = query.rows[0].id;
  // const share = options.reduce((a, obj) => a + Object.keys(obj).length, 0);
  const len = options.length + 1;
  const share = price / len;
  console.log("---->", share);

  options.map((opt) => {
    var q = db.query(
      `insert into shares (uid,pid,amount) values ('${opt.id}','${id}','${share}')`
    );
  });
  if (query.rowCount == 1) {
    res.send("success");
  } else {
    res.send("failed");
  }
};

exports.rent = async (req, res, next) => {
  const id = req.body.id;
  var query = await db.query(
    `SELECT pid,name,price FROM shares join products on shares.pid=products.id and shares.uid='${id}'`
  );
  // console.log("---->", query.rows);
  if (query.rowCount == 0) {
    res.send("No");
  } else {
    res.send(query.rows);
  }
};
