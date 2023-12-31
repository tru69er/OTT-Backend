import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    id: String,
    title: String,
    year: Number,
    genre: String,
    director: String,
    desc: String,
    watchLater: Boolean,
  },
  {
    collection: "Movies",
  }
);

export default model("Movies", schema, "Movies");
