const { User, Thoughts } = require("../models");
const thoughtController = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  // Get a thought
  getSingleThoughts({ params }, res) {
    Thoughts.find({ _id: params.id })
      .select("-__v")
      // .populate("user")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No thought with that ID" });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },

  // },`POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  // Create a thought
  createThoughts({ body }, res) {
    Thoughts.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // update user by _id
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No Thoughts found with this ID!" });
          return;
        }
        return res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete user by _id
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No thoughts found with this ID!" });
          return;
        }
        // return Thought.deleteMany({ userId: params.id });
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  },
  
};
module.exports = thoughtController;
