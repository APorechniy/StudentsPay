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

app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
    next();
});

//Add routing
routes(app);

//Start server
const server = app.listen(app.get('port'), (error) => {
    if (error) return console.log(`Error: ${error}`); 
    console.log(`Server listening on port ${app.get('port')}`);
});
