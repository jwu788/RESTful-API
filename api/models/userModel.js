'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

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
    status:{
        type:[{
            type: String,
            enum: ['active', 'inactive']
        }],
        default: ['inactive']
    }
});

module.exports = mongoose.model('User', UserSchema);