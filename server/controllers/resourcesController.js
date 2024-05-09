const Resources = require('../db/models/Resources');

exports.createResource = async (req, res) => {
  const { organization_id, category, name, description } = req.body;

  const resource = await Resources.create({ organization_id, category, name, description });

  res.send(resource);
}

exports.listResources = async (req, res) => {
  const resources = await Resources.listAll();
  res.send(resources);
}

exports.listResourcesForOrganization = async (req, res) => {
  const { organization_id } = req.params;

  const resources = await Resources.listResourcesForOrganization(organization_id);
  res.send(resources);
}