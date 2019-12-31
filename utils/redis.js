let redis = require('ioredis');
let redisConfig = require('./../config/config').redis;
let client = new redis(redisConfig);
module.exports = client;