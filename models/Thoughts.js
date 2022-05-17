// const mongoose = require("mongoose");
// const { User } = require('../models/user');
const { Schema, model } = require("mongoose");
const reactionSchema = new Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    ref: "reactionCount",
  },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const thoughtsSchema = new Schema(
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
      type: Schema.Types.username,
      ref: "User",
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
const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
