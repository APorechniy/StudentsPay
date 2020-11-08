const config = require('./config.json');
const routes = require('./src/routing/index');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', (process.env.PORT || config.port));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

const server = app.listen(app.get('port'), (error) => {
    if (error) return console.log(`Error: ${error}`); 
    console.log(`Server listening on port ${app.get('port')}`);
});
