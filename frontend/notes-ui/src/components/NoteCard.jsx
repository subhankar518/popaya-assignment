import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function NoteCard({ note, handleDelete }) {
  return (
    <div className="card">
      <h3>{note.title}</h3>

      <p>
        {note.content.length > 100
          ? note.content.slice(0, 100) + "..."
          : note.content}
      </p>

      <small>
        Updated{" "}
        {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
      </small>

      <div className="actions">
        <Link to={`/note/${note._id}`}>
          <button>View</button>
        </Link>

        <Link to={`/edit/${note._id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={() => handleDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
