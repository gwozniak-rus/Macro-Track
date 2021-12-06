const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port: "3307",
    database: "macrotrack",
    user: "test",
    password: "password123"
})

con.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected!");
    con.query(`SELECT *
               FROM meals;`, (err, result) => {
            if (err) throw err;
            if (result) {
                console.log('query successful!!!')
            }

            console.log("Created meals table");
        }
    )
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
    console.log('listening on 3000');
});

app.options('*', cors()) // include before other routes

// CREATE
app.post('/post', (req, res) => {
    var sql = "INSERT INTO meals(name, calories, created_at, updated_at) VALUES (?, ?, NOW(), NOW())";
    con.query(sql, [req.body.name, req.body.calories], (err, result) => {
        if (err) throw err;
        con.query('SELECT * from meals ORDER BY id DESC LIMIT 1;', (err, result) => {
            res.send([{status: "success", entry: result[0]}]);
        })
    });
});

// READ ALL
app.get('/get', (req, res) => {
    con.query("SELECT * FROM meals", (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

// READ ONE
app.get('/get/:id', (req, res) => {
    let sql = "SELECT * FROM meals WHERE id=?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// UPDATE
app.put('/update/:id', (req, res) => {
    var sql = "UPDATE meals SET name=?, calories=?, updated_at=NOW() WHERE id=?";
    console.log(sql, [req.body.name, req.body.calories, req.params.id]);
    con.query(sql, [req.body.name, req.body.calories, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({status: "success"});
    });
})

// DELETE
app.get('/delete/:id', (req, res) => {
    var sql = "DELETE FROM meals WHERE id=?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({status: "success"});
    });
})
