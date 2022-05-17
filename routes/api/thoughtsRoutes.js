const router = require('express').Router();
const {
  // - `GET` to get all thoughts
  getThoughts,
  // `GET` to get a single thought by its `_id`
  getSingleThoughts,
  // `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  createThoughts,
  // `PUT` to update a thought by its `_id`
  updateThoughts,
  // `DELETE` to remove a thought by its `_id`
  deleteThoughts,

  // **`/api/thoughts/:thoughtId/reactions`**
  // `POST` to create a reaction stored in a single thought's `reactions` array field
  createReaction,

  // `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
  deleteReaction,
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/courses/:thoughtsId
router.route('/:thoughtsId').get(getSingleThoughts).put(updateThoughts).delete(deleteThoughts);

// /api/user/:usertId/friends
router.route('/:thoughtsId/reaction').post(createReaction);

// /api/user/:userId/friends/:friendsId
router.route('/:thoughtsId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;

// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// ```