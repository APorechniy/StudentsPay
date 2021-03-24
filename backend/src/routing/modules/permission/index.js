const permissions = (app, pool) => {
    /* Получение прав пользователя */

    app.post(`/api/backend/permissions/get-permissions`, (request, response) => {
        let date = new Date();
        let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        pool.query(`SELECT * FROM permissions WHERE name = '${request.body.role}'`, (err, result) => {
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
}

module.exports = permissions;