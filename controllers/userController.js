// import the models that we need to use
const { Thought, User } = require('../models');

// export an object that will house all of our functions
module.exports = {
    getUsers(req, res) {
        User.find()
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUsers(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((User) =>
                !User
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json(User)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUsers(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))

    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, New: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }).then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteFriend(req, res) { 
        User.findOneAndUpdate({ _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }).then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }







}
