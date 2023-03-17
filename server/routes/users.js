const { Router } = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  removeUser,
} = require("../controllers/users");
const usersRouter = Router();

usersRouter.get("/", getUser);
usersRouter.get("/:id", getUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", removeUser);

module.exports = { usersRouter };
