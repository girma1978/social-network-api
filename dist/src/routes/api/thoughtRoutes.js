"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = require("../../controllers/thoughtController");
const router = (0, express_1.Router)();
// /api/thoughts
router.route('/')
    .get(thoughtController_1.getAllThoughts)
    .post(thoughtController_1.createThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(thoughtController_1.getThoughtById)
    .put(thoughtController_1.updateThought)
    .delete(thoughtController_1.deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(thoughtController_1.addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController_1.removeReaction);
exports.default = router;
