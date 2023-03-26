const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
// will allow us to send any data from body
app.use(express.json());
// to allow an application to use our backend server...
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Anant@12",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Hola...Its a backend brother...");
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES(?)"; // ? used beacause of security purpose
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) res.status(400).json(err);
    else res.status(200).json(data);
  });
});

app.listen(8800, () => {
  console.log("Hola..Its Connected");
});
