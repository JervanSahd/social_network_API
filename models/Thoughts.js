// const mongoose = require("mongoose");
// const { User } = require('../models/User');
// const { Schema, model } = require("mongoose");
// const reactionSchema = new Schema({
//   reactionID: {
//     type: Schema.Types.ObjectId,
//     default: () => new Types.ObjectId(),
//     ref: "reactionCount",
//   },
//   reactionBody: { type: String, required: true, maxlength: 280 },
//   username: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
const mongoose = require("mongoose");
// const { Thoughts } = require("../models/Thoughts");
// const { Schema, Types } = require("mongoose");
const Schema = mongoose.Schema;

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
      type: String,
      ref: "User",
    },
    // reaction: reactionSchema,
  },
  // {
  //   toJSON: {
  //     getters: true,
  //   },
  //   id: false,
  // }
);
const Thoughts = mongoose.model("Thoughts", thoughtsSchema);

// thoughtsSchema.virtual("reactionCount").get(function () {
//   return this.comments.length;
// });

module.exports = Thoughts;
