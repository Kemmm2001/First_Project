require('./Models/database');
const express = require('express');
import configViewEngine from './configs/viewEngine';
import initWeb from './router/web';
var cors = require('cors')
var bodyParser = require('body-parser')

require('dotenv').config()


const app = express();
const port = process.env.PORT || 3003;

// sendFile will go here
// app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port);
app.use(cors())
// app.use('/', categoryController);

configViewEngine(app);

//Init web router
initWeb(app);



console.log('Server started at http://localhost:' + port);