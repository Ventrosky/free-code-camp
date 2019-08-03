const express = require('express');
const exerciseController = require('../controllers/exercise');
const router = express.Router();

// api/exercise/new-user => POST
router.post('/new-user', exerciseController.postAddUser);

// api/exercise/users => GET
router.get('/users', exerciseController.getUsers);

// api/exercise/add => POST
router.post('/add', exerciseController.postAddExercise);

// api/exercise/log => GET
router.get('/log?:userId/:from?/:to?/:limit?', exerciseController.getLogs);

module.exports = router;
