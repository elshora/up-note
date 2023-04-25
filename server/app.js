const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { usersRouter } = require("./routes/users");
const { authRouter } = require("./routes/auth");
const { postsRouter } = require("./routes/posts");

dotenv.config();
const { DB_URI, SERVER_PORT } = process.env;

const app = express();
app.use(cors(), express.json());
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDP Connected"))
  .catch((err) => console.log(err));

app.listen(SERVER_PORT || 5000, () => {
  console.log(`Server Started - Listening on port: ${SERVER_PORT || "5000"}`);
});
