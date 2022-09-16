require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const http = require('http').Server(app)
const db = require('./config/database')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users',async (req,res)=>{
	const page = req.query.page
	const limit = req.query.limit
	const query='SELECT * FROM users OFFSET $1 LIMIT $2;'
	const values = [page*limit, limit]
	const {rows} = await db.query(query, values)
	res.json(rows)
})

http.listen(port, ()=>{
	console.log(`listening on ${port}`)
})
