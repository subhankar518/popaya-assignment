import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/notes",
});

export const getNotes = () => api.get("/get-all-notes");

export const getSingleNote = (id) => api.get(`/get-single-note/${id}`);

export const createNote = (data) => api.post("/create-note", data);

export const updateNote = (id, data) => api.put(`/update-note/${id}`, data);

export const deleteNote = (id) => api.delete(`/delete-note/${id}`);

export const searchNotes = (searchString) =>
  api.get(`/search?searchString=${searchString}`);
