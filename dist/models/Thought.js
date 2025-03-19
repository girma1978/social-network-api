"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reactionSchema = new mongoose_1.Schema({
    reactionBody: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: { type: String, required: true },
    username: { type: String, required: true },
    reactions: [reactionSchema] // Array of subdocuments (reactions)
}, { toJSON: { virtuals: true }, id: false });
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
