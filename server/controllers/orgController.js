const Organization = require('../db/models/Organization');

exports.createOrganization = async (req, res) => {
  const { name } = req.body;

  const organization = await Organization.create(name);
  res.send(organization);
}

exports.listOrganizations = async (req, res) => {
  const organizations = await Organization.list();
  res.send(organizations);
}

exports.specificOrganization = async (req, res) => {
  const { id } = req.params;

  const organization = await Organization.find(id);
  if (!organization) return res.sendStatus(404);

  res.send(organization);
}

exports.updateOrganization = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const updatedOrganization = await Organization.update(id, name);
  if (!updatedOrganization) return res.sendStatus(404);
  res.send(updatedOrganization);
}

exports.deleteOrganization = async (req, res) => {
  const { id } = req.params;

  const organization = await Organization.delete(id);
  res.send(organization);
}