const express = require('express')
const routes = require('./routes')
const sequelize = require('./config/connection')
const cors = require('cors')
require('dotenv').config()
const session = require('express-session');
const store = new session.MemoryStore()
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())
app.use(cookieParser())

app.use(session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: false,
}))


app.use('/', express.static(__dirname + 'public'))
app.use(routes)

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'))
})