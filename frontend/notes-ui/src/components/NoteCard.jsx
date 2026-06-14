import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { NOTE_TYPES } from "../constants/noteTypes";

function NoteCard({ note, handleDelete }) {
  const noteType =
    NOTE_TYPES.find((item) => item.value === note.type) || NOTE_TYPES[0];

  const Icon = noteType.icon;

  return (
    <div className="card">
      <div
        className="note-badge"
        style={{
          backgroundColor: noteType.color,
        }}
      >
        <Icon size={14} />
        <span>{noteType.label}</span>
      </div>

      <h3>{note.title}</h3>

      <p>
        {note.content?.length > 120
          ? `${note.content.slice(0, 120)}...`
          : note.content}
      </p>

      <small className="updated-time">
        Updated{" "}
        {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
      </small>

      <div className="actions">
        <Link to={`/note/${note._id}`}>
          <button className="view-btn">View</button>
        </Link>

        <Link to={`/edit/${note._id}`}>
          <button className="edit-btn">Edit</button>
        </Link>

        <button className="delete-btn" onClick={() => handleDelete(note._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
