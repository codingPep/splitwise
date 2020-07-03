const express = require("express");

const app = express();

var cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var user = require("./routes/user");

var prod = require("./routes/product");

var friends = require("./routes/friends");

app.use("/user", user);

app.use("/product", prod);

app.use("/friend", friends);

app.listen(5000, function () {
  console.log("Splitwise backend is listening on port 5000....");
});
