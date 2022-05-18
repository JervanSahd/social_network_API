// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const userController = {
  
  // Get all users
  getUsers(req, res) {
    ser.find({})
            .populate({ path: "thoughts", select: "-__v" })
            .populate({ path: "friends", select: "-__v -thoughts" })
            .select("-__v")
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                return res.status(400).json(err);
            });
    },
  
  // Get a single user
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
            .populate({ path: "thoughts", select: "-__v" })
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this ID!" });
                    return;
                }
                return res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                return res.status(400).json(err);
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

module.exports = userController;
