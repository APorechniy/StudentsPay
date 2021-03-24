const pool = require('../db_connect/index');
const auth = require('./modules/auth');
const permissions = require('./modules/permission');
const profile = require('./modules/profile');
const statements = require('./modules/statements');
const users = require('./modules/users')

let router;
if(typeof pool !== undefined){
    router = app => {
        auth(app, pool);
        profile(app, pool);
        permissions(app, pool);
        statements(app, pool);
        users(app, pool);
    }
} else {
    router = app => {
        app.get('*', (request, response) => {
            let date = new Date();
            let mysql_date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            pool.query(`INSERT INTO request_log (id, url, host, response_status, date) VALUES (null, '${request.url}', '${request.headers.host}', 400, '${mysql_date}')`);
            response.send(null);
        })
    }
}

module.exports = router;