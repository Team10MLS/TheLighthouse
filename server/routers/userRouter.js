const express = require('express');
const userControllers = require('../controllers/userControllers');
const checkAuthentication = require('../middleware/checkAuthentication');

// create a sub-router in out application
const userRouter = express.Router();

userRouter.post('/', userControllers.createUser);

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
//POST /api/users
userRouter.get('/', checkAuthentication, userControllers.listUsers);
userRouter.get('/:id', checkAuthentication, userControllers.showUser);
userRouter.patch('/:id', checkAuthentication, userControllers.updateUser);

module.exports = userRouter;
