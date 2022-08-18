const router = require('express').Router();

const {
    getUsers,
    getSingleUsers,
    createUsers,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js');

// localhost:3001/api/users
router.route('/').get(getUsers).post(createUsers);

// localhost:3001/api/users/{userid goes here}
router.route('/:userId').get(getSingleUsers).put(updateUser).delete(deleteUser);

// localhost:3001/api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;

// export the info to the api/index doc