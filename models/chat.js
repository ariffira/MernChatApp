const mongoose = require('mongoose');
const config = require('../config/database');

// Chat Schema
const ChatSchema = mongoose.Schema({
    roomTitle: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
});

const Chat =  module.exports = mongoose.model('Chat', ChatSchema);

module.exports.addChatRoom = function (newChat, callback) {
    newChat.save(callback);
};