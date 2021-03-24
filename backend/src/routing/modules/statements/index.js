const statements = (app, pool) => {

    /* Получение списка заявок*/
    app.post(`/api/backend/statements/get-statements`, (request, response) => {
        let date = new Date();
        let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        pool.query(`SELECT * FROM statement LIMIT ${request.body.limit} OFFSET ${request.body.offset}`, (err, result) => {
            if(err){
                // Logging error
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                console.log("Error in " + request.url);
                response.status(400);
                response.send(null);
            } else {
                response.send(result);
                console.log(`>${request.url} - 200`)
                // Loggin request
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
            }
        })
    })

    /* Подтверждение заявки*/
    app.put(`/api/backend/statements/confirm`, (request, response) => {
        let date = new Date();
        let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        pool.query(`UPDATE statement SET status='ОДОБРЕНА' WHERE id=${request.body.id}`, (err, result) => {
            if(err){
                // Logging error
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                console.log("Error in " + request.url);
                response.status(400);
                response.send(null);
            } else {
                response.status(200);
                response.send(null);
                console.log(`>${request.url} - 200`)
                // Loggin request
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
            }
        })
    })

    /* Отклонение заявки*/
    app.put(`/api/backend/statements/reject`, (request, response) => {
        let date = new Date();
        let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        pool.query(`UPDATE statement SET status='ОТКЛОНЕНА' WHERE id=${request.body.id}`, (err, result) => {
            if(err){
                // Logging error
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                console.log("Error in " + request.url);
                response.status(400);
                response.send(null);
            } else {
                response.status(200);
                response.send(null);
                console.log(`>${request.url} - 200`)
                // Loggin request
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
            }
        })
    })
}

module.exports = statements;