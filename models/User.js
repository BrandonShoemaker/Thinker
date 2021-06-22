const {Schema, model, Types} = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        // {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User'
        // }
        this
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.path('email').validate(function(email){
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
});

UserSchema.virtual('friendCount').get(function(){
    return this.friends.reduce((total, friend) => total + friend.friends.length + 1, 0);
})

const User = model('User', UserSchema);

module.exports = User;