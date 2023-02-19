const authRouter = require("express").Router();
const { register, login } = require("../middleware/auth");

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = { authRouter };
