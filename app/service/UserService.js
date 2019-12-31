let User = require('../model/UserModel');
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let secretOrKey = 'graduationprojectdesign';
let redis = require('../../utils/redis');
module.exports = {
    checkUserParamPromise: function(reqParam) {
        return new Promise((resolve, reject) => {
            if (!reqParam.phone) {
                reject({ code: 201, message: '注册失败-手机号不能为空' });
            }
            if (!reqParam.pwd) {
                reject({ code: 201, message: '注册失败-密码不能为空' });
            }
            resolve({ code: 200, message: '注册成功' });
        })
    },
    //注册方法
    createUser: function(reqParam) {
        return new Promise((resolve, reject) => {
            let data = {};
            reqParam.phone && (data.phone = reqParam.phone);
            reqParam.pwd && (data.pwd = reqParam.pwd);
            reqParam.username && (data.username = reqParam.username);
            reqParam.join_time && (data.join_time = reqParam.join_time);
            reqParam.person_profile && (data.person_profile = reqParam.person_profile);
            reqParam.sex && (data.sex = reqParam.sex);
            reqParam.birthday && (data.birthday = reqParam.birthday);
            reqParam.occupation && (data.occupation = reqParam.occupation);
            reqParam.birth_area && (data.birth_area = reqParam.birth_area);
            reqParam.ofen_area && (data.ofen_area = reqParam.ofen_area);
            reqParam.browsing_history && (data.browsing_history = reqParam.browsing_history);
            reqParam.collections && (data.collections = reqParam.collections);
            reqParam.follows && (data.follows = reqParam.follows);
            reqParam.fans && (data.fans = reqParam.fans);
            reqParam.friends && (data.friends = reqParam.friends);
            reqParam.recipes && (data.recipes = reqParam.recipes);
            reqParam.works && (data.works = reqParam.works);
            let userData = new User(data);
            userData.save(function(err, data) {
                if (err) {
                    console.log('service', err);
                    reject({ code: 500, message: '创建用户-失败-' + err })
                } else {
                    console.log('servicedata', data);
                    resolve({ code: 200, message: '注册成功，请及时登录', result: data })
                }
            })
        })
    },
    //登录方法
    login: function(reqParam) {
        return new Promise((resolve, reject) => {
            if (!reqParam.phone) {
                reject({ code: 204, message: '登录失败-请先输入手机号' })
            }
            if (!reqParam.pwd) {
                reject({ code: 204, message: '登录失败-请先输入密码' })
            }
            User.countDocuments({ phone: reqParam.phone, pwd: reqParam.pwd }, (err, count) => {
                err && reject({ code: 500, message: '登录失败-' + err.message })
                count == 0 && reject({ code: 205, message: '登录失败-查询无此用户' })
                    //进行token操作后
                const payload = { _id: data._id, phone: data.phone };
                const token = jwt.sign(payload, secretOrKey);
                redis.hmset(token, { _id: data._id.toString(), createTime: new Date() });
                // redis.expire(token, 60 * 15);
                resolve({ code: 200, message: "登录成功", result: token })
            })
        })
    },
    //admin获取用户信息接口
    getUser: function(reqParam) {
        return new Promise((resolve, reject) => {
            console.log(reqParam, 'reqParam');
            let data = {},
                skip, limit;
            if (reqParam.skip) skip = reqParam.skip;
            else skip = 0;
            if (reqParam.limit) limit = reqParam.limit;
            else limit = 100;
            if (reqParam.account) data.account = reqParam.account;
            if (reqParam.password) data.password = reqParam.password;
            if (reqParam.nickname) data.nickname = reqParam.nickname;
            User.countDocuments(data, function(err, count) {
                console.log(count);
                if (err) {
                    console.log(err);
                    reject({ code: 500, message: '查询用户失败-' + err.message })
                } else {
                    console.log(parseInt(skip), parseInt(limit), 'num');
                    User.find(data, null, { skip: parseInt(skip), limit: parseInt(limit) }, function(err, docs) {
                        if (err) {
                            console.log(err);
                            reject({ code: 201, message: "查询用户失败-" + err.message })
                        } else {
                            console.log('service,data', docs);
                            resolve({ code: 200, count: count, message: "查询成功", result: docs })
                        }
                    })
                }
            })
        })
    },
    //用户修改自己的信息
    updateData: function(reqParam) {
        return new Promise((resolve, reject) => {
            let data = {},
                updateData = {};
            if (!reqParam._id) {
                reject({ code: 201, message: '修改信息失败-主键ID不能为空' })
            } else {
                data._id = mongoose.Types.ObjectId(reqParam._id);
            }
            reqParam.pwd && (updateData.pwd = reqParam.pwd);
            reqParam.username && (updateData.username = reqParam.username);
            reqParam.person_profile && (updateData.person_profile = reqParam.person_profile);
            reqParam.sex && (updateData.sex = reqParam.sex);
            reqParam.birthday && (updateData.birthday = reqParam.birthday);
            reqParam.occupation && (updateData.occupation = reqParam.occupation);
            reqParam.birth_area && (updateData.birth_area = reqParam.birth_area);
            reqParam.ofen_area && (updateData.ofen_area = reqParam.ofen_area);
            User.findOneAndUpdate(data, updateData, { new: false }, function(err, data) {
                if (err) {
                    reject({ code: 500, message: '修改信息失败' + err })
                } else {
                    resolve({ code: 200, message: '修改信息成功' })
                }
            })
        })
    },
    //admin删除用户
    delete: function(reqParam) {
        return new Promise((resolve, reject) => {
            let data = {};
            if (!reqParam._id) {
                reject({ code: 201, message: '删除失败-主键不能为空' })
            } else {
                data._id = mongoose.Types.ObjectId(reqParam._id);
            }
            User.findOneAndRemove(data, function(err, data) {
                console.log(data);
                if (err) {
                    reject({ code: 500, message: '删除失败-' + err.message })
                } else {
                    resolve({ code: 200, message: '删除成功' })
                }
            })
        })
    },
};