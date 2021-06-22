const {User} = require('../models');

const userController = {
    getUsers(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserResults => res.json(dbUserResults))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getUser({params}, res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserResults => {
            if(!dbUserResults){
                res.status(404).json({message: 'This user was not found'});
                return;
            }
            res.json(dbUserResults);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addUser({body}, res){
        User.create(body)
        .then(dbUserResults => res.json(dbUserResults))
        .catch(err => res.status(500).json(err));
    },

    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserResults => {
            if(!dbUserResults){
                res.status(404).json({message: 'this user was not found'});
                return;
            }
            res.json(dbUserResults);
        })
        .catch(err => res.status(500).json(err))
    },

    updateUser({body, params}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbUserResults => {
            if(!dbUserResults){
                res.status(404).json({message: 'This user was not found'});
                return;
            }
            res.json(dbUserResults);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteUser({params}, res){
        User.findOneAndDelete(
            {_id: params.id}
        )
        .then(dbUserResults => {
            if(!dbUserResults){
                res.status(404).json({message: 'This user was not found'});
                return;
            }
            res.json(dbUserResults);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserResults => {
            if(!dbUserResults){
                res.status(404).json({message: 'This user was not found'});
                return;
            }
            res.json(dbUserResults);
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = userController;