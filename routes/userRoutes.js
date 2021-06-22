const router = require('express').Router();
const {
    getUsers,
    getUser,
    addUser,
    addFriend,
    updateUser,
    deleteUser,
    deleteFriend
} = require('../controllers/user-controller');


router
.route('/')
.get(getUsers)
.post(addUser);

router
.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friend/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;