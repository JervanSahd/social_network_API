// const { ObjectId } = require("mongoose").Types;
const { User, Thoughts } = require("../models");

const thoughtController = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThoughts(req, res) {
    Thoughts.findOne({ _id: req.params.id })
      .select("-__v")
      .populate("user")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // },`POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  // Create a thought
  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

//   createThoughts({ body }, res) {
//     console.log(body);
//     Thoughts.create(body)
//     .then(({ _id }) => {
//         return User.findOneAndUpdate(
//             { _id: body.userId },
//             { $push: { thoughts: _id }},
//             { new: true }
//         );
//     })
//     .then(dbUserData => {
//         if(!dbUserData) {
//             res.status(404).json({ message: 'No user found.' });
//             return;
//         }
//     res.json(dbUserData);
//     })
//     .catch(err => res.json(err));
// },




  // Delete a thought
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with that ID" })
          : User.deleteMany({ _id: { $in: thoughts.user } })
      )
      .then(() => res.json({ message: "Thoughts and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // },`POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  // Create a reaction
  createReaction(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.reactionID })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with that ID" })
          : User.deleteMany({ _id: { $in: thoughts.user } })
      )
      .then(() => res.json({ message: "Thoughts and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
module.exports = thoughtController;