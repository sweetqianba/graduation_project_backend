let userServer = require('../service/UserService');
let authServer = require('../service/AuthService');
let redis = require('./../../utils/redis');
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
    login: (req, res, next) => {
        let reqParam = req.query;
        userServer.login(reqParam).then(result => {
            console.log('getData', result);
            res.send(result);
        }).catch(err => {
            res.send(err);
        })
    },
    logout: function(req, res, next) {
        authServer.auth(req, '*')
            .then(result => {
                redis.del(req.header('token'));
                res.send({ code: 200, message: "退出登陆-成功" })
            })
            .catch(err => {
                res.send(err)
            })
    },
    //admin获取用户信息
    getData: function(req, res, next) {
        authServer.auth(req, '*').then(() => {
            let reqParam = req.query;
            userServer.getUser(reqParam).then(result => {
                console.log('getData', result);
                res.send(result);
            }).catch(err => {
                res.send(err);
            }).catch(err => {
                res.send(err)
            })
        })
    },
    update: function(req, res, next) {
        authServer.auth(req, '*').then(() => {
            let reqParam = req.body;
            userServer.updateData(reqParam).then(result => {
                res.send(result)
            }).catch(err => {
                res.send(err);
            })
        }).catch(err => {
            res.send(err)
        });
    },
    //admin删除用户接口
    delete: function(req, res, next) {
        authServer.auth(req, '*').then(() => {
            let reqparam = req.body;
            userServer.delete(reqparam).then(result => {
                res.send(result)
            }).catch(err => {
                res.send(err);
            })
        }).catch(err => { res.send(err) })
    }
};