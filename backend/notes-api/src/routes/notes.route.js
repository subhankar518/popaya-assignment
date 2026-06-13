import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  searchNotes,
} from "../controllers/notes.controller.js";

const notesRouter = Router();

notesRouter.post("/create-note", createNote);
notesRouter.get("/get-all-notes", getAllNotes);
notesRouter.get("/get-single-note/:id", getSingleNote);
notesRouter.put("/update-note/:id", updateNote);
notesRouter.delete("/delete-note/:id", deleteNote);
notesRouter.get("/search", searchNotes);

export default notesRouter;
