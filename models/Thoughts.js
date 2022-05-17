const mongoose = require("mongoose");
const { Schema, Types } = require("mongoose");
const reactionSchema = new mongoose.Schema({
  reactionID: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    ref: "reactionCount",
  },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const thoughtsSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: mongoose.Schema.Types.username,
      ref: "user",
    },
    reaction: reactionSchema,
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.comments.length;
});
const Thoughts = mongoose.model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
