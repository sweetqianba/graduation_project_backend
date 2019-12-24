let User = require('../model/UserModel');
let mongoose = require('mongoose');
module.exports = {
    checkUserParamPromise: function(reqParam) {
        return new Promise((resolve, reject) => {
            if (!reqParam.phone) {
                reject({ code: 201, message: '创建用户失败-用户名不能为空' });
            }
            if (!reqParam.pwd) {
                reject({ code: 201, message: '创建用户失败-密码不能为空' });
            }
            resolve({ code: 200, message: '创建用户成功' });
        })
    },
    createUser: function(reqParam) {
        return new Promise((resolve, reject) => {
            let data = {};
            if (reqParam.phone) {
                data.phone = reqParam.phone;
            }
            if (reqParam.pwd) {
                data.pwd = reqParam.pwd;
            }
            if (reqParam.username) {
                data.username = reqParam.username;
            }
            if (reqParam.join_time) {
                data.join_time = reqParam.join_time;
            }
            if (reqParam.person_profile) {
                data.person_profile = reqParam.person_profile;
            }
            if (reqParam.sex) {
                data.sex = reqParam.sex;
            }
            if (reqParam.birthday) {
                data.birthday = reqParam.birthday;
            }
            if (reqParam.occupation) {
                data.occupation = reqParam.occupation;
            }
            if (reqParam.birth_area) {
                data.birth_area = reqParam.birth_area;
            }
            if (reqParam.ofen_area) {
                data.ofen_area = reqParam.ofen_area;
            }
            if (reqParam.browsing_history) {
                data.browsing_history = reqParam.browsing_history;
            }
            if (reqParam.collections) {
                data.collections = reqParam.collections;
            }
            if (reqParam.follows) {
                data.follows = reqParam.follows;
            }
            if (reqParam.fans) {
                data.fans = reqParam.fans;
            }
            if (reqParam.friends) {
                data.friends = reqParam.friends;
            }
            if (reqParam.recipes) {
                data.recipes = reqParam.recipes;
            }
            if (reqParam.works) {
                data.works = reqParam.works;
            }
            let userData = new User(data);
            userData.save(function(err, data) {
                if (err) {
                    console.log('service', err);
                    reject({ code: 500, message: '创建用户-失败-' + err })
                } else {
                    console.log('servicedata', data);
                    resolve({ code: 200, message: '创建用户成功' })
                }
            })
        })
    },
    // getUser: function (reqParam) {
    //     return new Promise((resolve, reject) => {
    //         console.log(reqParam, 'reqParam');
    //         let data = {}, skip, limit;
    //         if (reqParam.skip) skip = reqParam.skip; else skip = 0;
    //         if (reqParam.limit) limit = reqParam.limit; else limit = 100;
    //         if (reqParam.account) data.account = reqParam.account;
    //         if (reqParam.password) data.password = reqParam.password;
    //         if (reqParam.nickname) data.nickname = reqParam.nickname;
    //         User.countDocuments(data, function (err, count) {
    //             console.log(count);
    //             if (err) {
    //                 console.log(err);
    //                 reject({code: 500, message: '查询用户失败-' + err.message})
    //             } else {
    //                 console.log(parseInt(skip), parseInt(limit), 'num');
    //                 User.find(data, null, {skip: parseInt(skip), limit: parseInt(limit)}, function (err, docs) {
    //                     if (err) {
    //                         console.log(err);
    //                         reject({code: 201, message: "查询用户失败-" + err.message})
    //                     } else {
    //                         console.log('service,data', docs);
    //                         resolve({code: 200, count: count, message: "查询成功", result: docs})
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // },
    // updateData: function (reqParam) {
    //     return new Promise((resolve, reject) => {
    //         let date = new Date();
    //         // data里存的_id是用于下面查询并修改的 findOneAndUpdate
    //         let data = {}, updateData = {};
    //         console.log(reqParam);
    //         if (date.getHours() < 12) {
    //             reject({code: 202, message: '还没到时间'});
    //             return
    //         }
    //         if (!reqParam._id) {
    //             reject({code: 201, message: '更新失败-主键ID不能为空'})
    //         } else {
    //             data._id = mongoose.Types.ObjectId(reqParam._id);
    //         }
    //         if (reqParam.account) {
    //             updateData.account = reqParam.account;
    //         }
    //         if (reqParam.password) {
    //             updateData.password = reqParam.password;
    //         }
    //         if (reqParam.nickname) {
    //             updateData.nickname = reqParam.nickname;
    //         }
    //         console.log(updateData, 'updateData');
    //         User.findOneAndUpdate(data, updateData, {new: false}, function (err, data) {
    //             console.log(data);
    //             if (err) {
    //                 reject({code: 500, message: '更新失败' + err})
    //             } else {
    //                 resolve({code: 200, message: '更新用户成功'})
    //             }
    //         })
    //     })
    // },
    // delete: function (reqParam) {
    //     return new Promise((resolve, reject) => {
    //         let data = {};
    //         if (!reqParam._id) {
    //             reject({code: 201, message: '删除失败-主键不能为空'})
    //         } else {
    //             data._id = mongoose.Types.ObjectId(reqParam._id);
    //         }
    //         User.findOneAndRemove(data, function (err, data) {
    //             console.log(data);
    //             if (err) {
    //                 reject({code: 500, message: '删除失败-' + err.message})
    //             } else {
    //                 resolve({code: 200, message: '删除成功'})
    //             }
    //         })
    //     })
    // }
};