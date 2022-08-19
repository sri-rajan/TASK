import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollno: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    academicYear: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    fees: [{ fee: { type: Number } }],
    feesHistory: [{ history: { type: String } }],
    parentId: { type: String, default: "" },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Student", StudentSchema);

export default StudentModel;
