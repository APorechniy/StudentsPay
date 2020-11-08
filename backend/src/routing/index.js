const { request, response } = require('express');
const pool = require('../db_connect/index');

let router;
if(typeof pool !== undefined){
    router = app => {
        app.get('/api/v1/categories/', (request, response) => {
            try {
                pool.query('SELECT * FROM categories', (error, result) => {
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

        app.get('/api/v1/subs/:id', (request, response) => {
            try {
                pool.query(`SELECT * FROM subs WHERE CategoriesId = ${request.params.id}`, (error, result) => {
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

        app.get('/api/v1/equipment/:subsId', (request, response) => {
            try{
                pool.query(`SELECT * FROM equipment WHERE SubsID = ${request.params.subsId}`, (error, result) => {
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

        app.get('/api/v1/equip/:id', (request, response) => {
            try {
                pool.query(`SELECT * FROM equipment WHERE ID = ${request.params.id}`, (error, result) => {
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

        app.get('/api/v1/categoryName/:id', (request, response) => {
            try {
                pool.query(`SELECT description FROM categories WHERE ID = ${request.params.id}`, (error, result) => {
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

        app.get('/api/v1/subsName/:id', (request, response) => {
            try {
                pool.query(`SELECT description FROM subs WHERE ID = ${request.params.id}`, (error, result) => {
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

        app.get('/api/v1/equipName/:id', (request, response) => {
            try {
                pool.query(`SELECT name FROM equipment WHERE ID = ${request.params.id}`, (error, result) => {
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