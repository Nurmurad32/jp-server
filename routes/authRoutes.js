const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');
const { createAJob, allJob, jobDetails, deleteJob, editJob } = require('../controllers/jobsController');


router.get('/', test);
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/profile', getProfile)
router.post('/logout', logoutUser);

router.post('/create', createAJob)
router.get('/jobs', allJob)
router.get('/jobs/:id', jobDetails)
router.delete('/jobs/:id', deleteJob)
router.patch('/jobs/:id', editJob)

module.exports = router;