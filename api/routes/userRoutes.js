'use strict';
module.exports = function(app){
    var UserController = require('../controller/userController');

    app.route('/users')
        .get(UserController.list_users)
        .post(UserController.add_user);

    app.route('/users/:userId')
        .get(UserController.get_user)
        .put(UserController.update_user)
        .delete(UserController.delete_user);
    
    app.route('/login')
        .post(UserController.login_user);
};