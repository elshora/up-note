const { Router } = require("express");
const {
  addPost,
  updatePost,
  deletePost,
  getUserPosts,
} = require("../controllers/users");
const postssRouter = Router();

usersRouter.post("/", addPost);
usersRouter.get("/", getUserPosts);
usersRouter.put("/:id", updatePost);
usersRouter.deletPost("/:id", deletePost);

module.exports = { postssRouter };
