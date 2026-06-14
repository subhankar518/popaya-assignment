import { Note } from "../models/notes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNote = asyncHandler(async (req, res) => {
  const { title, content, type } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, "Title is required");
  }

  const noteData = {
    title: title.trim(),
  };

  if ("content" in req.body) {
    noteData.content = content;
  }

  if ("type" in req.body) {
    noteData.type = type;
  }

  const note = await Note.create(noteData);

  return res
    .status(201)
    .json(new ApiResponse(201, note, "Note created successfully"));
});

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().sort({ updatedAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

const getSingleNote = asyncHandler(async (req, res) => {
  const noteId = req?.params?.id;

  if (!noteId) {
    throw new ApiError(400, "Note ID is required");
  }

  const note = await Note.findById(noteId);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  res.status(200).json(new ApiResponse(200, note, "Note fetched successfully"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, type } = req?.body;
  const noteId = req?.params?.id;

  const updatedNote = {};

  if ("title" in req.body) {
    updatedNote.title = title;
  }

  if ("content" in req.body) {
    updatedNote.content = content;
  }

  if ("type" in req.body) {
    updatedNote.type = type;
  }

  if (Object.keys(updatedNote).length === 0) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const recentUpdatedNote = await Note.findByIdAndUpdate(noteId, updatedNote, {
    new: true,
    runValidators: true,
  });

  if (!recentUpdatedNote) {
    throw new ApiError(404, "Note not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, recentUpdatedNote, "Note updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req?.params?.id;

  if (!noteId) {
    throw new ApiError(400, "Note ID is required");
  }

  const deletedNote = await Note.findByIdAndDelete(noteId);

  if (!deletedNote) {
    throw new ApiError(404, "Note not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Note deleted successfully"));
});

const searchNotes = asyncHandler(async (req, res) => {
  const searchString = req?.query?.searchString || "";

  const notes = await Note.find({
    $or: [
      {
        title: {
          $regex: searchString,
          $options: "i",
        },
      },
      {
        content: {
          $regex: searchString,
          $options: "i",
        },
      },
      {
        type: {
          $regex: searchString,
          $options: "i",
        },
      },
    ],
  });

  res
    .status(200)
    .json(new ApiResponse(200, notes, "Search completed successfully"));
});

export {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  searchNotes,
};
