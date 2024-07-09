const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    title: { type: String, required: true },
    cate: { type: String, required: true },
    salary: { type: String, required: true },
    deadline: { type: String, required: true },
    descriptions: { type: String, required: true },
}, { collection: 'jobs' });

const jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;
