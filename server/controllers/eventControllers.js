const Events = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  const { organizations_id, user_id, event, event_time, location } = req.body;

  const newEvent = await Events.create({ organizations_id, user_id, event, event_time, location });

  res.send(newEvent);
}

exports.listEvents = async (req, res) => {
  const events = await Events.listAll();

  res.send(events);
}

exports.listEventsForOrganization = async (req, res) => {
  const { organizations_id } = req.params;

  const events = await Events.listEventsForOrganization(organizations_id);

  res.send(events);
}

exports.editEvent = async (req, res) => {
  const { organizations_id, user_id, event, event_time, location } = req.body;

  const editedEvent = await Events.edit({ organizations_id, user_id, event, event_time, location });

  res.send(editedEvent);
}

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  const deletedEvent = await Events.delete({ id });

  res.send(deletedEvent);
}