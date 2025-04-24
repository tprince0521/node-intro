const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


const mysql = require("mysql2")
const db = mysql.createConnection({
    host: '66.198.240.46',
    user: 'bfzhiwes_node-intro-user',
    password: 'node-intro-user-password',
    database: 'bfzhiwes_node-intro'
})

app.get('/students', (req, res) => {
    let sql = 'select * from students'
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err)
        res.json(result)
    })
    console.log('someone hit the database')
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/form', (req, res) => {
    res.sendFile(`${__dirname}/public/form.html`)
})

app.post('/add-student', (req, res) => {
    let name = req.body.name
    let grade = req.body.grade
    console.log(`Hey ${name} you got an ${grade} `)
    let sql = `insert into students (name, grade) values ("${(name)}", ${grade})`

    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err)
        res.redirect('/students')
    })
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})