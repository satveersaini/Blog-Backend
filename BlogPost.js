import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    tags: [String],
    upvote: {
      type: Number,
      default: 0,
    },
    creator: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Blogs", BlogSchema);

export default model;
