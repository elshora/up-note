const { Router } = require("express");
const {
  addPost,
  updatePost,
  deletePost,
  getUserPosts,
} = require("../controllers/posts");
const postsRouter = Router();

postsRouter.post("/", addPost);
postsRouter.get("/", getUserPosts);
postsRouter.put("/:id", updatePost);
postsRouter.delete("/:id", deletePost);

module.exports = { postsRouter };
