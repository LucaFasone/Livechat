import * as express from "express";
import mysql from "mysql2/promise";
const app = express();

app.use(express.json());

app.listen(3000);

app.get("/status", (req, res) => {
  res.send("OK");
});
