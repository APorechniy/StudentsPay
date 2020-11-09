const { request, response } = require('express');
const pool = require('../db_connect/index');

let router;
if(typeof pool !== undefined){
    router = app => {
        app.get('/', (request, response) => {
            try {
                pool.query('SHOW TABLES', (error, result) => {
                    if(error) throw error;
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                    response.setHeader('Cache-Control', 'no-cache');
                    response.send(result);
                })
            }
            catch(err){
                console.log("Error in " + request.url)
                console.log(err)
            }
        });
    }
} else {
    router = app => {
        app.get('*', (request, result) => {
            response.send(null);
        })
    }
}

module.exports = router;