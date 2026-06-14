import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getSingleNote } from "../api/notesApi";

function ViewNote() {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await getSingleNote(id);

        setNote(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!note) {
    return <h2>Note Not Found</h2>;
  }

  return (
    <div className="view-note">
      <h1>{note.title}</h1>

      <p>{note.content}</p>

      <div className="dates">
        <small>Created: {new Date(note.createdAt).toLocaleString()}</small>

        <small>Updated: {new Date(note.updatedAt).toLocaleString()}</small>
      </div>

      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default ViewNote;
