const express = require('express');
const resourcesController = require('../controllers/resourcesController');

const resourceRouter = express.Router();

resourceRouter.get('/', resourcesController.listResources);
resourceRouter.post('/', resourcesController.createResource);
resourceRouter.delete('/:id', resourcesController.deleteResource);


module.exports = resourceRouter;