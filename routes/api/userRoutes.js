const router = require("express").Router();
const {
  // `GET` all users
  getUsers,
  // `GET` a single user by its `_id` and populated thought and friend data
  getSingleUser,
  // `POST` a new user:
  createUser,
  // `PUT` to update a user by its `_id`
  updateUser,
  // `DELETE` to remove user by its `_id`
  deleteUser,
  // **`/api/users/:userId/friends/:friendId`**
  // // - `POST` to add a new friend to a user's friend list
  addFriend,
  // // `DELETE` to remove a friend from a user's friend list
  removeFriend,
} = require("../../controllers/userController");

// /api/user
router.route("/").get(getUsers).post(createUser);
// /api/user/:userId
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);
// /api/user/:usertId/friends
router.route("/:id/friend").post(addFriend).delete(removeFriend);

module.exports = router;
