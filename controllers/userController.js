const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  
  // Get all users
  getUser(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              grade: await grade(req.params.id),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },


  updateUser(req, res) {
    User.updateOne(req.body)
    
  },


  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { users: req.params.id },
              { $remove: { users: req.params.id } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'User deleted, but no courses found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an friends to a user
  addFriend(req, res) {
    console.log('You are adding an friends');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friends from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $remove: { friends: { id: req.params.id } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

// // `GET` all users
// getUser,
// // `GET` a single user by its `_id` and populated thought and friend data
// getSingleUser,
// // `POST` a new user:
// createUser,
// // `PUT` to update a user by its `_id`
// updateUser,

// // `DELETE` to remove user by its `_id`
// deleteUser,

// // **`/api/users/:id/friends/:friendId`**
// // - `POST` to add a new friend to a user's friend list
// addFriend,

// // `DELETE` to remove a friend from a user's friend list
// removeFriend,


