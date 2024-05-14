const { isAuthorized } = require('../utils/auth-utils');
const User = require('../db/models/User');


exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  // TODO: check if username is taken, and if it is what should you return?
  // if username is taken
  try {
    // Check if username is taken
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).send({ message: 'Username is already taken.' });
    }

    const user = await User.create(username, password);
    req.session.userId = user.id;

    res.send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
};


exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) return res.sendStatus(404);

  res.send(user);
};

exports.updateUser = async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;

  // Not only do users need to be logged in to update a user, they
  // need to be authorized to perform this action for this particular
  // user (users should only be able to change their own profiles)
  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const updatedUser = await User.update(id, username);
  if (!updatedUser) return res.sendStatus(404);
  res.send(updatedUser);
};
