const { v4: uuidv4 } = require('uuid');

const auth = (app, pool) => {
    /* Регистрация нового пользователя */
    app.post('/api/auth/signup', (request, response) => {
        setKey = async (key) => {
            pool.query(`UPDATE users SET session = '${key}' WHERE login = '${request.body.login}'`, (err, result) => {
                if(err){
                    // Logging error
                    pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, 'SYSTEM', 'SYSTEM', 400, '${mysql_date}')`);
                    console.log("Error added key");
                }
            });
        }

        const k = uuidv4();

        // Create current date-time for MySQL format
        let date = new Date();
        let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        pool.query(`INSERT INTO users (id, name, role, start_date, login, password, account_status) VALUES (null, '${request.body.name}', '${request.body.role}', '${mysql_date}', '${request.body.login}', '${request.body.password}', "НА РАССМОТРЕНИИ")`, (err, result) => {
            if(err){
                // Logging error
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                console.log("Error in insert" + request.url);
            } else {
                // Loggin request
                // Add session key

                setKey(k);
                console.log(`>${request.url} - 200`)
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
            }
        })

        pool.query(`INSERT INTO statement (id, from_user, for_type, date_create, status) VALUES (null, '${request.body.login}', "REGISTRATION", '${mysql_date}', "НА РАССМОТРЕНИИ")`, (err, result) => {
            if(err){
                // Logging error
                console.log(err)
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                console.log("Error in statement " + request.url);
                response.status(400);
                response.send(null);
            } else {
                response.status(200);
                response.send({
                    token: k
                });
                console.log(`>${request.url} - 200`)
                // Loggin request
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
            }
        })
    });

    /* Авторизация пользователя */
    app.post('/api/auth/signin', (request, response) => {
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
            if(err || result.length <= 0){
                // Logging error
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
                console.log("Error in " + request.url);
                response.status(400);
                response.send(null);
            } else {
                result[0].session = k;

                response.send({
                    session: k
                });

                console.log(`>${request.url} - 200`)

                // Loggin request
                pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 200, '${mysql_date}')`);
            }
        })
    });
}

module.exports = auth;