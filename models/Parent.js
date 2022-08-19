import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ParentSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    mobNum: {
      type: Number,
    },
    studentId: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ParentModel = mongoose.model("Parent", ParentSchema);

export default ParentModel;
