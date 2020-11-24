const { v4: uuidv4 } = require('uuid');
const { request, response } = require('express');
const pool = require('../db_connect/index');

let router;
if(typeof pool !== undefined){
    router = app => {
        app.get('/', (request, response) => {

            // Create current date-time for MySQL format
            let date = new Date();
            let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                       
            // Send MySQL request
            pool.query('SHOW TABLES', (err, result) => {
                if(err){
                    // Logging error
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                    console.log("Error in " + request.url);
                    response.status(400);
                    response.send(null);
                } else {                    
                    response.send(result);
                    // Loggin request
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
                }
            })            
        });

        app.get(`/user`, (request, response) => {
            let date = new Date();
            let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            
            pool.query(`SELECT * FROM users WHERE session = '${request.query.uuid}'`, (err, result) => {
                if(err){
                    // Logging error
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                    console.log("Error in " + request.url);
                    response.status(400);
                    response.send(null);
                } else {                    
                    response.send(result);
                    // Loggin request
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
                }
            })     
        })

        app.post('/registration', (request, response) => {


            // Create current date-time for MySQL format
            let date = new Date();
            let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            pool.query(`INSERT INTO users (id, name, role, start_date, login, password) VALUES (null, ${request.data.name}, ${request.data.role}, ${mysql_date}, ${request.data.login}, ${request.data.password})`, (err, result) => {
                if(err){
                    // Logging error
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                    console.log("Error in " + request.url);
                    response.status(400);
                    response.send(null);
                } else {                    
                    response.status(200);
                    response.send(result);
                    // Loggin request
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
                }
            })
        });

        app.post('/signin', (request, response) => {
            setKey = async (key) => {
                pool.query(`UPDATE users SET session = '${key}' WHERE login = '${request.body.login}'`, (err, result) => {                
                    if(err){
                        // Logging error
                        pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, 'SYSTEM', 'SYSTEM', 400, '${mysql_date}')`);
                        console.log("Error added key");
                    }
                });
            }
            // Create current date-time for MySQL format
            let date = new Date();
            let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            // Add session key
            const k = uuidv4();   
            setKey(k);            
            
            pool.query(`SELECT * FROM users WHERE login = '${request.body.login}' AND password = '${request.body.password}';`, (err, result) => {
                if(err){
                    // Logging error
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                    console.log("Error in " + request.url);
                    response.status(400);
                    response.send(null);
                } else {       
                    result[0].session = k;
                    response.status(200);
                    response.send(result);
                    
                    // Loggin request
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