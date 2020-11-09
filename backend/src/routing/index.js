const { request, response } = require('express');
const pool = require('../db_connect/index');

let router;
if(typeof pool !== undefined){
    router = app => {
        app.get('/', (request, response) => {

            let date = new Date();
            let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                       
            pool.query('SHOW TABLES', (err, result) => {
                if(err){
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                    console.log("Error in " + request.url);
                    response.status(400);
                    response.send(null);
                } else {
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                    response.setHeader('Cache-Control', 'no-cache');
                    response.send(result);
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
                }
            })            
        });
    }
} else {
    router = app => {        
        app.get('*', (request, response) => {
            let date = new Date();
            let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
            response.send(null);
        })
    }
}

module.exports = router;