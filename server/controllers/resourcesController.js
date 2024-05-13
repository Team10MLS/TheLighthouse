const Resources = require('../db/models/Resources');

exports.createResource = async (req, res) => {
  const { organization_id, category, name, description } = req.body;

  const resource = await Resources.create({ organization_id, category, name, description });

  res.send(resource);
};

exports.updateResource = async (req, res) => {
  const { id } = req.params;
  const { category, name, description } = req.body;

  const resource = await Resources.update({ id, category, name, description });

  res.send(resource);
};

exports.deleteResource = async (req, res) => {
  const { id } = req.params;

  const resource = await Resources.delete({ id });

  res.send(resource);
};

exports.listResources = async (req, res) => {
  const resources = await Resources.listAll();
  res.send(resources);
};

exports.listResourcesForOrganization = async (req, res) => {
  const { organization_id } = req.params;

  const resources = await Resources.listResourcesForOrganization(organization_id);
  res.send(resources);
};

exports.listResourcesByCategory = async (req, res) => {
  const { category } = req.params;

  const resources = await Resources.listResourcesByCategory(category);
  res.send(resources);
};
