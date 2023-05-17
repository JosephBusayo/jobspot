const mongoose = require('mongoose')
const Schema  = mongoose.Schema



const jobSchema = new Schema({
    title :{
        type: 'string',
        required: true
    },
    company :{
        type: 'string',
        required: true
    },
    tag: {
        type: 'string',
        required: true
    },
    type :{
        type: 'string',
        required: true
    },
    salary:{
        type: 'string',
        required: true
    },

    
    desc :{
        type: 'string',
    },
    todo : {
        type: 'string',
    },
    req: {
        type: 'string',
    },
    link:{
        type: 'string',
        required: true
    },

}, {timestamps: true})


const Job = mongoose.model('Job', jobSchema)
module.exports = Job