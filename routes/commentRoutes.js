const router = require('express').Router();
const {
    getThoughts,
    getThought,
    createThought,
    createReaction,
    updateThought,
    deleteThought,
    deleteReaction
} = require('../controllers/though-controller');


router
.route('/')
.get(getThoughts)

router
.route('/:id')
.get(getThought)
.post(createThought)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(createReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;