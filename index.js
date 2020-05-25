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

app.get('/', function(req, res) {
    res.render('home', {
        title: 'Home'
    });
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
app.get('/family_view', (req, res) => {
    let sql = "SELECT * FROM Family";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('family_view', {
            results: results
        });
    });
});

//route for Nuclear Family 
app.get('/nuclear_fam', (req, res) => {
    let sql = "SELECT * FROM Family WHERE family_relation = 'Spouse' OR family_relation = 'Daughter' OR family_relation = 'Son'";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('nuclear_fam', {
            results: results
        });
    });
});

//route for Intermediate Family 
app.get('/im_fam', (req, res) => {
    let sql = "SELECT * FROM Family WHERE family_relation = 'Mother' OR family_relation = 'Father' OR family_relation = 'Brother' OR family_relation = 'Sister' OR family_relation = 'Grandmother' OR family_relation = 'Grandfather'";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('im_fam', {
            results: results
        });
    });
});

//route for Extended Family 
app.get('/extended_fam', (req, res) => {
    let sql = "SELECT * FROM Family WHERE family_relation = 'Uncle' OR family_relation = 'Aunt' OR family_relation = 'Cousin' OR family_relation = 'Godparent'";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('extended_fam', {
            results: results
        });
    });
});

//route for Friend's Database
app.get('/friend_view', (req, res) => {
    let sql = "SELECT * FROM Family WHERE family_relation = 'Friend' OR family_relation = 'Acquaintance'";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('friend_view', {
            results: results
        });
    });
});

//route for Search Tab
app.get('/search_view', (req, res) => {
    let sql = "SELECT * FROM Family WHERE family_name = ' ' OR family_DOB = ' ' OR family_address = ' ' OR family_city = ' ' OR family_state = ' ' OR family_phonenumber = ' '";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('search_view', {
            results: results
        });
    });
});

//route for Search Tab
app.get('/search', function(req, res) {
    connection.query('SELECT * from Family where family_name like "%' + req.query.key + '%"',
        function(err, rows, fields) {
            if (err) throw err;
            var data = [];
            for (i = 0; i < rows.length; i++) {
                data.push(rows[i].family_name);
            }
            res.end(JSON.stringify(data));
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