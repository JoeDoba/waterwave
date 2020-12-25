const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleID: String,
    githubID: String,
    name: String,
    credits: {type: Number, default: 0},
});

mongoose.model('users', userSchema);