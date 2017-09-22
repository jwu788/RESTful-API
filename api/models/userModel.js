'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique : true },
    },
    password:{
        type: String,
        required: true
    },
    created_date:{
        type: Date,
        default: Date.now
    },
    updated_date:{
        type: Date,
        default: Date.now
    },
    status:{
        type:[{
            type: String,
            enum: ['active', 'inactive']
        }],
        default: ['inactive']
    }
});

UserSchema.pre('save', function(next){
    var user = this;

    this.updated_date = Date.now();
    
    //only hash the password if it has been modified
    if (!user.isModified('password')) return false;

    //Generate the salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err){
            return next(err);
        }
        
        bcrypt.hash(user.password, salt, function(err, encrypted){
            if(err){
                return next(err);
            }

            user.password = encrypted;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword,this.password,function(err, same){
        if (err) return cb(err);
        cb(null, same);
    });
};

module.exports = mongoose.model('User', UserSchema);