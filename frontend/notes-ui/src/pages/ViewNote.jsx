import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { getSingleNote } from "../api/notesApi";
import { NOTE_TYPES } from "../constants/noteTypes";

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
    return <div className="view-note-loading">Loading...</div>;
  }

  if (!note) {
    return <div className="view-note-loading">Note Not Found</div>;
  }

  const noteType =
    NOTE_TYPES.find((item) => item.value === note.type) || NOTE_TYPES[0];

  const Icon = noteType.icon;

  return (
    <div className="view-note">
      <div
        className="single-note-badge"
        style={{
          backgroundColor: noteType.color,
        }}
      >
        <Icon size={16} />
        <span>{noteType.label}</span>
      </div>

      <h1>{note.title}</h1>

      <div className="note-meta">
        <span>
          Created{" "}
          {formatDistanceToNow(new Date(note.createdAt), {
            addSuffix: true,
          })}
        </span>

        <span>
          Updated{" "}
          {formatDistanceToNow(new Date(note.updatedAt), {
            addSuffix: true,
          })}
        </span>
      </div>

      <div className="note-content">
        {note.content || "No content available"}
      </div>

      <div className="note-footer">
        <div className="note-dates">
          <small>Created At: {new Date(note.createdAt).toLocaleString()}</small>

          <small>Updated At: {new Date(note.updatedAt).toLocaleString()}</small>
        </div>

        <div className="note-actions">
          <Link to={`/edit/${note._id}`}>
            <button className="view-edit-btn">Edit Note</button>
          </Link>

          <Link to="/">
            <button className="view-back-btn">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
