const config        = require('./config.json');        //(1)
const routes        = require('./src/routing/index');
const express       = require('express');
const bodyParser    = require('body-parser');

// Create express app
const app = express();

//Set port from config file (1)
app.set('port', (process.env.PORT || config.port));

//Add "JSON" parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

//Add routing
routes(app);

//Start server
const server = app.listen(app.get('port'), (error) => {
    if (error) return console.log(`Error: ${error}`); 
    console.log(`Server listening on port ${app.get('port')}`);
});
