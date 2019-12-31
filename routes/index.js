module.exports = {
    //用户管理
    'POST /user/add': 'UserController.add', //注册
    'GET /user/login': 'UserController.login', //登录
    'PUT /user/update': 'UserController.update', //用户修改个人信息

    //admin权限下的用户管理
    'GET /admin/getData': 'UserController.getData', //admin获取用户
    'DELETE /admin/delete': 'UserController.delete', //admin删除用户
};