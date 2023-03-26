const router = require('express').Router();

const {
    createReaction,
    deleteReaction
} = require('../../controllers/reactionController');

// /api/apps
router.route('/')
    .post(createReaction)
    ;

// /api/apps/:ReactionId
router.route('/:id')
    .delete(deleteReaction);

module.exports = router;
