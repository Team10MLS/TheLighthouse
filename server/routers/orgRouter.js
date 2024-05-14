const express = require('express');
const orgControllers = require('../controllers/orgController');

const orgRouter = express.Router();

orgRouter.post('/', orgControllers.createOrganization);
orgRouter.get('/', orgControllers.listOrganizations);
orgRouter.get('/:id', orgControllers.specificOrganization);
orgRouter.patch('/:id', orgControllers.updateOrganization);
orgRouter.delete('/:id', orgControllers.deleteOrganization);

module.exports = orgRouter;