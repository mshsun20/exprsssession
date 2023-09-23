const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

// env vars
const port = 5050
const host = 'localhost'
const user = 'root'
const password = ''
const database = 'expsessdb'

// middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret:'P85shi10BaJ5Q4',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*2
    }
}))

// db
const conn = mysql.createConnection({host, user, password, database, multipleStatements: true})
conn.connect((err) => {
    if (err) {
        console.log(`DB Connection Error !!!`)
    }
    else {
        console.log('Successfully Connected to Database ...')
    }
})

// routes
app.get('/home', (req, res) => {
    // console.log(req.session.usernm)
    if (req.session.usernm) {
        res.json({message:'Already Logged In.', statuscode:200, user:req.session.usernm})
    }
    else {
        res.json({message:'Not Yet Loged In !!', statuscode:400})
    }
})

app.post('/login', (req, res) => {
    const {acc_email, acc_pass} = req.body
    const sql = `select * from account where acc_email='${acc_email}' and acc_pass='${acc_pass}'`
    conn.query(sql, (err, result) => {
        // console.log(result.length)
        if (err) {
            res.json({error:err})
        }
        if (result.length>0) {
            // console.log(result[0].acc_name)
            req.session.usernm = result[0].acc_name
            res.json({success:'Successfully Logged In.', statuscode:200, user:req.session.usernm})
        }
        else {
            res.json({error:'User Not Found', statuscode:401})
        }
    })
})

// ping
app.listen(port, host, (req, res) => {
    console.log(`Server is Online at http://${host}:${port}`)
})

