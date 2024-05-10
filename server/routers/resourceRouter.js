const express = require('express');
const resourcesController = require('../controllers/resourcesController');



const resourceRouter = express.Router();

resourceRouter.get('/', resourcesController.listResources);
resourceRouter.get('/organization/:organization_id', resourcesController.listResourcesForOrganization);
resourceRouter.get('/category/:category', resourcesController.listResourcesByCategory);
resourceRouter.patch('/:id', resourcesController.updateResource);
resourceRouter.post('/', resourcesController.createResource);
resourceRouter.delete('/:id', resourcesController.deleteResource);


module.exports = resourceRouter;