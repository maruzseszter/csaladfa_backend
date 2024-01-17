const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
server.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csaladfa"
});

db.connect(function (error) {
    if (error) {
        console.log("Hiba a csatlakozáskor.");
    } else {
        console.log("Csatlakozva az adatbázishoz.");
    }
});

server.listen(3000, function check(error) {
    if (error) {
        console.log("Szerverhiba.");
    } else {
        console.log("A szerver elindult.");
    }
});


server.get("/api/csaladfa", (req, res) => {
    var sql = "SELECT * FROM people";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Hibás csatlakozás");
        } else {
            res.send({ status: true, data: result });
        }
    });
});


server.delete("/api/csaladfa/delete/:id", (req, res) => {
    let sql = "DELETE FROM people WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "A személy törlése sikertelen!" });
        } else {
            res.send({ status: true, message: "A személy sikeresen törölve lett." });
        }
    });
});

