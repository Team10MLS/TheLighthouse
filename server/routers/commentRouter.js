const express = require('express');
const commentControllers = require('../controllers/commentController');

const commentRouter = express.Router();

commentRouter.get('/:post_id', commentControllers.listCommentsForPost);
commentRouter.post('/', commentControllers.createComment);
commentRouter.delete('/:user_id/:post_id', commentControllers.deleteComment);
commentRouter.patch('/', commentControllers.editComment);

module.exports = commentRouter;