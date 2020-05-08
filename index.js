//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//Create connection
const conn = mysql.createConnection({
    host: '35.233.154.39',
    user: 'root',
    password: '1Iluvj3sus',
    database: 'cake'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));

//route for homepage
app.get('/', (req, res) => {
    let sql = "SELECT * FROM Family";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('family_view', {
            results: results
        });
    });
});

//route for insert data
app.post('/save', (req, res) => {
    let data = { family_name: req.body.family_name, family_DOB: req.body.family_DOB, family_address: req.body.family_address, family_city: req.body.family_city, family_state: req.body.family_state, family_phonenumber: req.body.family_phonenumber, family_email: req.body.family_email, family_gender: req.body.family_gender, family_relation: req.body.family_relation };
    let sql = "INSERT INTO Family SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//route for update data
app.post('/update', (req, res) => {
    let sql = "UPDATE Family SET family_name='" + req.body.family_name + "', family_DOB='" + req.body.family_DOB + "', family_address='" + req.body.family_address + "', family_city='" + req.body.family_city + "', family_state='" + req.body.family_state + "', family_phonenumber='" + req.body.family_phonenumber + "', family_email='" + req.body.family_email + "', family_gender='" + req.body.family_gender + "', family_relation='" + req.body.family_relation + "' WHERE family_id=" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//route for delete data
app.post('/delete', (req, res) => {
    let sql = "DELETE FROM Family WHERE family_id=" + req.body.family_id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//server listening
app.listen(8000, () => {
    console.log('Server is running at port 8000');
});