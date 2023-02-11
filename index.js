const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerOptions = {
    explorer: true,
};
require('dotenv').config()


const connectDB = require('./config/db');


const app = express();
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerOptions));
app.use('/admin', require('./routes/admin'));
connectDB();
app.listen(process.env.port, () => {
    console.log('Listening on port 8081');
})