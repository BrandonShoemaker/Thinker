const {User, Thought} = require('../models');

const thoughtController = {
    getThoughts(req, res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err));
    },

    getThought({params}, res){
        Thought.findOne(
            {_id: params.id}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No such thought'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },

    createThought({body, params}, res){
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.id},
                {$push: {thoughts: _id}},
                {new: true, runValidators: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'This user was not found'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },

    createReaction({body, params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'This thought was not found'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },

    updateThought({body, params}, res){
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'This thought was not found'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteThought({params}, res){
        Thought.findOneAndDelete(
            {_id: params.id}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'This thought was not found'});
                return;
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.userId}},
                {new: true}
            )
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'This user was not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'This thought was not found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = thoughtController;