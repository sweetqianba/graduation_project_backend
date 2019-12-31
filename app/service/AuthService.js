let jwt = require('jsonwebtoken');
let secretOrKey = 'graduationprojectdesign';
let redis = require('./../../utils/redis');
module.exports = {
    auth: function(req, method) {
        return new Promise(((resolve, reject) => {
            console.log('权限验证开始');
            let acl = require('../../utils/acl');
            if (req.header('token') === null || req.header('token') === undefined) {
                reject({ code: 401, message: '权限验证-失败-未登录' })
            }
            let token = req.header('token');
            redis.hgetall(token, function(err, reply) {
                if (err) {
                    reject({ code: 500, message: "权限验证-失败-" + err.message });
                } else {
                    console.log(reply, 'reply');
                    // if (reply._id === undefined || reply === undefined || !reply) {
                    //     reject({ code: 405, message: "权限验证-失败-查无此token" })
                    // } else {
                    //     console.log("reply", reply);
                    //     reply.refreshTime = parseInt(reply.refreshTime) + 1;
                    //     redis.hmset(token, reply);
                    //     redis.expire(token, 60 * 15);

                    //     jwt.verify(token, secretOrKey, function(err, decoded) {
                    //         if (err) {
                    //             reject({ code: 500, message: "权限验证-失败-" + err.message })
                    //         } else {
                    //             if (decoded._id.toString() !== reply._id.toString()) {
                    //                 reject({ code: 406, message: "权限验证-失败-token不匹配" })
                    //             }
                    //             console.log(decoded);
                    //             if (req.path === '/logout') {
                    //                 resolve({ code: 200, message: "success" });
                    //             } else {
                    //                 acl.isAllowed(decoded._id.toString(), req.path, method).then(isallowed => {
                    //                     console.log(decoded._id.toString());
                    //                     if (isallowed) {
                    //                         req.user = decoded;
                    //                         resolve({ code: 200, message: "success" });
                    //                     } else {
                    //                         reject({ code: 403, message: "权限验证-失败-无权限" });
                    //                     }
                    //                 })
                    //             }

                    //         }
                    //     });
                    // }
                }
            });
        }));
    }
}