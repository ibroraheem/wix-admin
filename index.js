const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config()

const connectDB = require('./config/db');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/admin', require('./routes/admin'));

connectDB();
app.listen(process.env.port, () => {
    console.log('Listening on port 3000');
})