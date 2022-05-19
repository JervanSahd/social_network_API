const { User, Thought } = require("../models");
const userController = {
  // get all users
  getUsers(req, res) {
    User.find({})
      // .populate({ path: "thoughts", select: "-_ /_v" })
      // .populate({ path: "friends", select: "-__v -thoughts" })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },

  // get single user by _id. this finds all the thoughts for this users.
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      // .populate({ path: "thoughts", select: "-__v" })
      // .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  // create new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // update user by _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete user by _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        } else {
          console.log({ message: "User has been deleted!" });
        }
        // return Thought.deleteMany({ userId: params.id });
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  },

  // add friends
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.id } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // delete friends
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.id } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};
module.exports = userController;
