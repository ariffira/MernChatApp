const mongoose = require('mongoose');
const config = require('../config/database');

// Chat Detail Schema
const ChatDetailSchema = mongoose.Schema({
    chatMsg: {
        type: String,
        required: true
    },
    msgBy: {
        type: String,
        required: true
    }
    ,
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    }
});

const ChatDetail =  module.exports = mongoose.model('ChatDetail', ChatDetailSchema);

module.exports.addChatMsg = function (newMsg, callback) {
    newMsg.save(callback);
};