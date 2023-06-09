const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { chats } = require('./src/data/testdata');
const connectDB = require('./src/config/db');
// const pageNotFound = require('./src/middleware/pageNotFound')
const userRoute = require('./src/routes/userRoute')
const chatRoute = require('./src/routes/chatRoute')
require('dotenv').config()
const port = process.env.PORT

connectDB()
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())



app.use(cors())

app.get('/', (req, res) => {
	res.send("Hello Backend")
})
app.use('/api/chats', chatRoute)
app.use('/api/user', userRoute)
// app.use(pageNotFound)

app.get('/chat/:id', (req, res) => {
	const search = chats.find((c) => c._id === req.params.id)
	console.log(req.params.id);
	res.send(search)
})


app.listen(port, () => {
	console.log("server started: " + `http://localhost:${port}`)
})