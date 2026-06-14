import mongoose from "mongoose";
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
    },

    content: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: [
        "Generic",
        "Important",
        "Personal",
        "Work",
        "Study",
        "Todo",
        "Reminder",
      ],
      default: "Generic",
    },
  },
  {
    timestamps: true,
  },
);

export const Note = mongoose.model("Note", noteSchema);
