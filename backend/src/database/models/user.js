const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    email :{
        type: 'string',
        required: true,
        unique: true
    },
    password :{
        type: 'string',
        required: true
    }
}, {timestamps: true})


const user = mongoose.model('user', userSchema)
module.exports = user