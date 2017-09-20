'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

exports.list_users = function(req, res){
    UserModel.find({}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
};

exports.add_user = function(req, res){

    var new_user = new UserModel(req.body);

    new_user.save(function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
};

exports.get_user = function(req, res){
    UserModel.findById(req.params.userId, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
};

exports.update_user = function(req, res){
    UserModel.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
        if (err){
            res.send(err);
        }
        res.json(user);
    });
};

exports.delete_user = function(req, res){
    UserModel.remove({_id: req.params.userId}, function(err, user){
        if (err){
            res.send(err);
        }
        res.json({message:'Task successfully deleted'});
    });
};