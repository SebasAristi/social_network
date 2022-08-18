const router = require('express').Router();
const {
    getSingleThought,
    getThoughts,
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    deleteReaction
} = require('../../controllers/thoughtController');

// localhost:3001/api/thoughts
router.route('/').get(getThoughts).post(createThought);

// localhost:3001/api/thoughts/{add the thought id here}
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// localhost:3001/api/thoughts/{add the thought id here}/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// localhost:3001/api/thoughts/{add the thought id here}/reactions/{add the reactioId here}
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;