require('./Models/database');
const express = require('express');
import configViewEngine from './configs/viewEngine';
import initWeb from './router/web';
var cors = require('cors')


require('dotenv').config()


const app = express();
const port = process.env.PORT || 3003;

// sendFile will go here
// app.use(express.static(__dirname + '/public'));
app.listen(port);
app.use(cors())
// app.use('/', categoryController);

configViewEngine(app);

//Init web router
initWeb(app);



console.log('Server started at http://localhost:' + port);