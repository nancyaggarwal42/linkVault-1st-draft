import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
    url: {type: String, required: true},
    name: {type: String, required: true},
    image: {type: String},
    filters: {type: [String], default: []},
    groups: {type: [String], default: []}
}, {timestamps: true})

export const link = mongoose.model('link', linkSchema)