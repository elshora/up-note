const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    auther: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pser", postSchema);
