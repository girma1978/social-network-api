"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dateFormat_1 = require("../utils/dateFormat");
// Reaction Schema (will be used as a subdocument)
const reactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => (0, dateFormat_1.formatDate)(timestamp)
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});
exports.default = reactionSchema;
