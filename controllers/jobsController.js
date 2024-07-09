const Job = require("../models/job");

const createAJob = async (req, res) => {
    try {
        const { title, cate, salary, deadline, descriptions } = req.body;
        console.log(title, cate, salary, deadline, descriptions)

        const job = await Job.create({ title, cate, salary, deadline, descriptions })

        return res.json({ status: "Success", user: job });

    } catch (error) {
        console.error(error);
        return res.json(error);
    }
}

const allJob = async (req, res) => {
    const result = await Job.find();
    res.send(result);
}

const jobDetails = async (req, res) => {
    const id = req.params.id;
    const query = { _id: id }

    const result = await Job.findOne(query)
    res.send(result)
}

const deleteJob = async (req, res) => {
    const id = req.params.id;
    const query = { _id: id }

    const result = await Job.deleteOne(query)
    res.send(result)
}

const editJob = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: id };

        const updatedJob = req.body; // Assume the body contains the fields to update
        const jobUpdate = {
            $set: updatedJob
        };

        const options = { new: true }; // Return the updated document

        const result = await Job.findByIdAndUpdate(filter, jobUpdate, options);

        if (!result) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.json({ status: "Success", job: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    createAJob,
    allJob,
    jobDetails,
    deleteJob,
    editJob
}