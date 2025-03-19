"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// User Schema
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address']
    },
    thoughts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});
// Create virtual property 'friendCount'
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Create the User model using the schema
const User = (0, mongoose_1.model)('User', userSchema);
// Export User model
exports.default = User;
