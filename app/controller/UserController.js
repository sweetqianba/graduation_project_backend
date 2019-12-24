let userServer = require('../service/UserService');
let mongoose = require('mongoose');
module.exports = {
    add: function(req, res, next) {
        let reqParam = req.body;
        userServer.checkUserParamPromise(reqParam).then(result => {
            console.log('add', 'result=>', result);
            return userServer.createUser(reqParam);
        }).then(result => {
            console.log('result', result);
            res.send(result);
        }).catch(err => {
            console.log('err', err);
            res.send(err);
        })
    },
    getData: function(req, res, next) {
        let reqParam = req.query;
        userServer.getUser(reqParam).then(result => {
            console.log('getData', result);
            res.send(result);
        }).catch(err => {
            res.send(err);
        })
    },
    update: function(req, res, next) {
        let reqParam = req.body;
        console.log(reqParam, 'reqParam');
        userServer.updateData(reqParam).then(result => {
            console.log('result=>' + result);
            res.send(result)
        }).catch(err => {
            res.send(err);
        })
    },
    delete: function(req, res, next) {
        let reqparam = req.body;
        userServer.delete(reqparam).then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err);
        })
    }

};