const express = require('express')
const app = express()
const cfg = require('./config')
const ClientOAuth2 = require('client-oauth2')
const client = new ClientOAuth2(cfg.client);
const util = require('util');
const axios = require('axios').default;
let cachedToken = {}
let appId = {}

app.set('view engine', 'pug')

app.get('/', function (req, res) {
    cachedToken = {}
    appId = {}
    res.render('index', { cfg: cfg });
})

app.get(cfg.paths.applyFlowStart, function (req, res) {
    console.log(cfg.paths.applyFlowStart)
    var uri = client.code.getUri()
    res.redirect(uri)
})

app.get(cfg.paths.authFlowCallback, function (req, res) {
    console.log(cfg.paths.authFlowCallback, req.originalUrl)
    client.credentials.getToken(req.originalUrl)
        .then(function (user) {
            console.log(user)
            cachedToken = user
            appId = res.req.query.appId
            return res.render('token', {
                user: util.inspect(user),
                cfg: cfg
            });
        })
        .catch(function (error) {
            console.log(error)
            return res.render('error', { error: error });
        })
})

app.get(cfg.paths.resourceData, function (req, res) {
    console.log(cfg.paths.resourceData, req.originalUrl)

    axios.request(cachedToken.sign({
            method: 'get',
            url: cfg.client.getApplicationUri + appId
        }))
        .then(function (response) {
            // handle success
             return res.render('application', {
                 user: util.inspect(response.data, {depth:null}),
                 cfg: cfg
             });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return res.render('error', {
                error: error
            });
        })
        .then(function () {
            // always executed
        });
    
})

app.listen(cfg.port, function () {
    'use strict';
    console.log('\n');
    console.log('+--------------------------');
    console.log(' PID %d', process.pid);
    console.log(' Listening on port', cfg.port);
    console.log('+--------------------------');
});