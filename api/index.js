require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const app = express();
const apiRoutes = require("./api/routes/api-routes");
const mongoose = require('mongoose');
const uri = process.env.URI;

mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


// rates update
const rateDb = require('./ratesdb.js')
rateDb.newCheckRates()
setInterval(rateDb.newCheckRates(), 86400000)

app.use(cors({
    origin: 'http://localhost:3000'
}))

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

// Import routes
app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes);

app.listen(8080, () => {
    console.log('Server running on port 8080')
})