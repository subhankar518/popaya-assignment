import { useEffect, useState } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import { getNotes, deleteNote, searchNotes } from "../api/notesApi";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      console.log("res: ");
      setNotes(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!search.trim()) {
        fetchNotes();
        return;
      }

      const res = await searchNotes(search);

      setNotes(res.data.data);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this note?");

    if (!confirmDelete) return;

    await deleteNote(id);

    fetchNotes();
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <Header />

      <SearchBar search={search} setSearch={setSearch} />

      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesPage;
