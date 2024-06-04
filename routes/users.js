const express = require('express');
const router = express.Router();

const authentication = require('../middleware/authentication');
const { login, me, logout } = require('../controllers/users/authController');
const { submit, allTasks } = require('../controllers/users/tasksController');

router.post('/login', login);
router.get('/me', authentication, me);
router.post('/logout', authentication, logout);


router.post('/getTasks', authentication, allTasks);
router.post('/submitTask', authentication, submit);



module.exports = router;