"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../../controllers/usercontroller");
const router = (0, express_1.Router)();
// /api/users
router.route('/')
    .get(usercontroller_1.getAllUsers)
    .post(usercontroller_1.createUser);
// /api/users/:userId
router.route('/:userId')
    .get(usercontroller_1.getUserById)
    .put(usercontroller_1.updateUser)
    .delete(usercontroller_1.deleteUser);
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(usercontroller_1.addFriend)
    .delete(usercontroller_1.removeFriend);
exports.default = router;
