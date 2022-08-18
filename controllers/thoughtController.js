// import the models that we need to use
const { Thought, User } = require('../models');

// export an object that will house all of our functions
module.exports = {
    getThoughts(req, res) {
        Thought.find().then((dbThoughtData) => {
            res.json(dbThoughtData)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId }).then((dbThoughtData) =>
            !dbThoughtData
                ? res.status(404).json({ message: 'No Thought found with this id' })
                : res.json(dbThoughtData)
        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought(req, res) {
        // ** HOW THE JSON BODY NEED TO LOOK **
        // {
        //     "thoughtText": "newThought should be created again",
        //        "username": "batman",
        //        "userId":"62fc6757ab58f97ceba91cf3"
        //  }
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    {
                        $push: { thoughts: dbThoughtData._id }
                    },
                    { new: true }
                )
            }).then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((dbThoughtData) =>
            !dbThoughtData
                ? res.status(404).json({ message: 'No Thought found with this id' })
                : res.json(dbThoughtData)
        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId },

        ).then((dbThoughtData) =>
            !dbThoughtData
                ? res.status(404).json({ message: 'No Thought found with this id' })
                : res.json(dbThoughtData)
        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addReaction(req, res) {
        // ** HOW THE JSON BODY NEED TO LOOK **
        // {
        //     "reactionBody":"whoa! dude",
        //     "username": "ferdinand"
        // }
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        ).then((dbThoughtData) =>
            !dbThoughtData
                ? res.status(404).json({ message: 'No Thought found with this id' })
                : res.json(dbThoughtData)
        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        ).then((dbThoughtData) =>
            !dbThoughtData
                ? res.status(404).json({ message: 'No Thought found with this id' })
                : res.json(dbThoughtData)
        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }

}
