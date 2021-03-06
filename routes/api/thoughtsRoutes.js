const router = require("express").Router();
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

 
} = require("../../controllers/thoughtsController.js");

// /api/thoughts
router.route("/").get(getThoughts).post(createThoughts);

// /api/courses/:thoughtsId
router
  .route("/:id").get(getSingleThoughts).put(updateThoughts).delete(deleteThoughts);



module.exports = router;
