const { Schema, Types } = require("mongoose");

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
const reactionSchema = new mongoose.Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    ref: "reactionCount",
  },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.virtual("reactionCount").get(function () {
  return this.comments.length;
});

module.exports = thoughtsSchema;
