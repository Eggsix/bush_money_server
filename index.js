// Main starting point of the application
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');


//move to separate file
const user = process.env.MONGO_USR_P;
const password = process.env.MONGO_PASS
const mLabURI = 'mongodb://' + user + ':'+ password + '@ds163195-a0.mlab.com:63195,ds163195-a1.mlab.com:63195/bushmall?replicaSet=rs-ds163195';

if (env === 'development') {
	mongoose.connect('mongodb://localhost:auth/auth');
} else {
	mongoose.connect(mLabURI);
}


// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);
// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on :', port);