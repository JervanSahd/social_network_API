

const router = require("express").Router();
const {
  // `GET` all users
  getUser,
  // `GET` a single user by its `_id` and populated thought and friend data
  getSingleUser,
  // `POST` a new user:
  createUser,
  // `PUT` to update a user by its `_id`
  updateUser,

  // `DELETE` to remove user by its `_id`
  deleteUser,

  // **`/api/users/:userId/friends/:friendId`**
  // - `POST` to add a new friend to a user's friend list
  addFriend,

  // `DELETE` to remove a friend from a user's friend list
  removeFriend,
} = require("../../controllers/userController");

// /api/user
router.route("/").get(getUser).post(createUser);

// /api/user/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

// /api/user/:usertId/friends
router.route("/:userId/friends").post(addFriend);

// /api/user/:userId/friends/:friendsId
router.route("/:userId/friends/:friendsId").delete(removeFriend);

module.exports = router;
