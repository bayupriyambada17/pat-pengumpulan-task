const express = require('express');
const router = express.Router();

const { login, me, logout } = require('../controllers/admin/authController');
const authentication = require('../middleware/authentication');
const { listUsers, registerUser, countUser } = require('../controllers/admin/userController');
const { listsTasks, createTask, updateTask, showTask, deleteTask } = require('../controllers/admin/tasksController');

router.post('/login', login);
router.get('/me', authentication, me);
router.post('/logout', authentication, logout);

router.get('/users/all', authentication, listUsers);
router.post('/users/register', authentication, registerUser);
router.get('/users/count', authentication, countUser);

router.get('/tasks/all', authentication, listsTasks);
router.post('/tasks/create', authentication, createTask);
router.put('/tasks/:id/update', authentication, updateTask);
router.get('/tasks/:id/show', authentication, showTask);
router.delete('/tasks/:id/delete', authentication, deleteTask);
module.exports = router;