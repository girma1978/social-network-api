"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = void 0;
const Thought_1 = __importDefault(require("../models/Thought"));
const user_1 = __importDefault(require("../models/user"));
// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought_1.default.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.getAllThoughts = getAllThoughts;
// Get a single thought by ID
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought_1.default.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.getThoughtById = getThoughtById;
// Create a new thought
const createThought = async (req, res) => {
    try {
        const thought = await Thought_1.default.create(req.body);
        // Add thought to the associated user's thoughts array
        await user_1.default.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.createThought = createThought;
// Update a thought
const updateThought = async (req, res) => {
    try {
        const thought = await Thought_1.default.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.updateThought = updateThought;
// Delete a thought
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought_1.default.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        // Remove thought from the associated user's thoughts array
        await user_1.default.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        res.json({ message: 'Thought deleted!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.deleteThought = deleteThought;
// Add a reaction to a thought
const addReaction = async (req, res) => {
    try {
        const thought = await Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.addReaction = addReaction;
// Remove a reaction from a thought
const removeReaction = async (req, res) => {
    try {
        const thought = await Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.removeReaction = removeReaction;
