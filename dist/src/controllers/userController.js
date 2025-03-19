"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Thought_1 = __importDefault(require("../models/Thought"));
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find()
            .populate('thoughts')
            .populate('friends');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.getAllUsers = getAllUsers;
// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.getUserById = getUserById;
// Create a new user
const createUser = async (req, res) => {
    try {
        const user = await User_1.default.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.createUser = createUser;
// Update a user
const updateUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.updateUser = updateUser;
// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        // BONUS: Remove a user's associated thoughts when deleted
        await Thought_1.default.deleteMany({ username: user.username });
        res.json({ message: 'User and associated thoughts deleted!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.deleteUser = deleteUser;
// Add a friend
const addFriend = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.addFriend = addFriend;
// Remove a friend
const removeFriend = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.removeFriend = removeFriend;
